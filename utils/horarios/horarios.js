const request = require('request');
const emojis = require('../emojis/emojis');
const destinos = require('./destinos');

if (process.env.NODE_ENV == 'development') {
  require('dotenv').config();
}

const access_token = process.env.ACCESS_TOKEN;

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

exports.consultarHorarios = async (senderId, origen, destino) => {
  let messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: '',
          buttons: [
            {
              type: 'web_url',
              url: `https://www.parhikuni.com/demo/compra_fb2.php?origen=${origen}&destino=${destino}`,
              title: 'Comprar',
              webview_height_ratio: 'tall',
              messenger_extensions: true,
            },
          ],
        },
      },
      quick_replies: [
        {
          content_type: 'text',
          title: 'Inicio',
          payload: 'INICIO_PAYLOAD',
        },
      ],
    },
  };

  await request(
    {
      uri: 'https://parhikuni.com.mx/wsBot/wsBot.php',
      qs: { origen, destino },
      method: 'GET',
    },
    (err, res, body) => {
      if (!err) {
        const response = JSON.parse(res.body);
        if (response.length === 0) {
          messageData = {
            recipient: {
              id: senderId,
            },
            message: {
              text: `Lo sentimos pero por el momento\n no hay salidas de ${destinos.oficinas(
                origen,
              )}\n hacia ${destinos.oficinas(destino)} 😅`,
              quick_replies: [
                {
                  content_type: 'text',
                  title: 'Inicio',
                  payload: 'INICIO_PAYLOAD',
                },
              ],
            },
          };
          callSendApi(messageData);
        } else {
          const corridas = response.map(
            ({ hHoraSalida, aTipoServicio, nTarifa }) => {
              emojis.reloj(hHoraSalida);
              return `🕐  ${hHoraSalida}\n${emojis.colorServicio(
                aTipoServicio,
              )}  $${nTarifa}  ${emojis.servicio(aTipoServicio)} `;
            },
          );
          messageData.message.attachment.payload.text = `🚌  ${destinos.oficinas(
            origen,
          )} - ${destinos.oficinas(destino)}\n\n${corridas.join('\n\n')}`;
          callSendApi(messageData);
        }
      } else {
        console.error('Unable to send message:' + err);
      }
    },
  );
};

function callSendApi(response) {
  request(
    {
      uri: 'https://graph.facebook.com/v8.0/me/messages/',
      qs: { access_token: access_token },
      method: 'POST',
      json: response,
    },
    (err, res, body) => {
      if (!err) {
        console.log('corridas sent!');
      } else {
        console.error('Unable to send message:' + err);
      }
    },
  );
}
