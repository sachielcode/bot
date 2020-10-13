var mysql = require('mysql');

if (process.env.NODE_ENV == 'development') {
  require('dotenv').config();
}

var connection = mysql.createConnection({
  host: process.env.DB_HORARIOS_HOST,
  user: process.env.DB_HORARIOS_USER,
  password: process.env.DB_HORARIOS_PASS,
  database: process.env.DB_HORARIOS_NAME,
});

exports.origenes = (senderId, origenes) => {
  let messageData = {
    recipient: {
      id: senderId,
    },
    message: {},
  };
  let quick_replies = [];
  for (let key in origenes) {
    if (origenes.hasOwnProperty(key)) {
      quick_replies.push({
        content_type: 'text',
        title: origenes[key],
        payload: `${key}_ORIGEN_PAYLOAD`,
      });
      messageData.message = {
        text: 'Origen',
        quick_replies: quick_replies,
      };
    }
  }
  return messageData;
};

exports.destino = (senderId, origenes, origen) => {
  let messageData = {
    recipient: {
      id: senderId,
    },
    message: {},
  };
  let quick_replies = [];
  for (let key in origenes) {
    if (origenes.hasOwnProperty(key)) {
      quick_replies.push({
        content_type: 'text',
        title: origenes[key],
        payload: `${origen}_DESTINO_${key}_PAYLOAD`,
      });
      messageData.message = {
        text: 'Destino',
        quick_replies: quick_replies,
      };
    }
  }
  return messageData;
};

exports.consultarHorarios = (senderId, origen, destino) => {
  let messageData = {
    recipient: {
      id: senderId,
    },
    message: {},
  };
  var query = `SELECT * FROM SIHorarios_pantalla WHERE aOficinaOrigen="${origen}" AND aOficinaDestino="${destino}"`;
  // var insertedId = '';
  // connection.query(query);
  connection.query(query, (err, res) => {
    if (err) throw err;
    // insertedId = res.insertId;
    console.log(res);
    // console.log('Last insert ID:', res.insertId);
    messageData.message = {
      text: `Horarios de salidas de ${origen} hacia ${destino}`,
    };
    return messageData;
  });
};
