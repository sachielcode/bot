'use strict';

if (process.env.NODE_ENV == 'development') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const access_token = process.env.ACCESS_TOKEN;
const app = express();

const destinos = require('./utils/horarios/destinos');
const horarios = require('./utils/horarios/horarios');

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());

app.get('/bot/', function (req, res) {
  res.send('Hola Mundo');
});

app.get('/bot/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Parhikuni Bot no tienes permisos');
  }
});

app.post('/bot/webhook', function (req, res) {
  const webhook_event = req.body.entry[0];
  if (webhook_event.messaging) {
    webhook_event.messaging.forEach((event) => {
      handleEvent(event.sender.id, event);
    });
  }
  res.sendStatus(200);
});

function handleEvent(senderId, event) {
  if (event.message.quick_reply) {
    // Si selecciona una opción de respuesta rápida
    handleQuickReply(senderId, event.message.quick_reply.payload);
  } else if (event.message) {
    //Si es un mensaje
    handleMessage(senderId, event.message);
  } else if (event.postback) {
    // Si selecciona una opción del menú
    handlePostback(senderId, event.postback.payload);
  }
}

function handleQuickReply(senderId, payload) {
  let payloadArr = payload.split('_');
  if (payload === 'HORARIOS_PAYLOAD') {
    callSendApi(horarios.origenes(senderId, destinos.destinos()));
  } else if (payloadArr[1] === 'ORIGEN') {
    const origen = payloadArr[0];
    callSendApi(horarios.destino(senderId, destinos.destinos(origen), origen));
  } else if (payloadArr[1] === 'DESTINO') {
    const origen = payloadArr[0];
    const destino = payloadArr[2];
    callSendApi(horarios.consultarHorarios(senderId, origen, destino));
  }
}

function handlePostback(senderId, payload) {
  switch (payload) {
    case 'GET_STARTED_SACHIELBOT':
      break;

    default:
      break;
  }
}

function handleMessage(senderId, event) {
  if (event.text) {
    // Mensaje por default
    defaultMessage(senderId);
  } else {
    // Otro mensaje
    const messageData = {
      recipient: {
        id: senderId,
      },
      message: {
        text: 'Hola?',
        quick_replies: [
          {
            content_type: 'text',
            title: 'Selecciona una opción de nuestro menú',
            payload: 'PIZZAS_PAYLOAD',
          },
        ],
      },
    };
    senderActions(senderId);
    setTimeout(() => {
      callSendApi(messageData);
    }, Math.floor(Math.random() * 5) * 1000);
  }
}

function defaultMessage(senderId) {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      text: 'Hola soy un bot de messenger y te invito a utilizar nuestro menú',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Horarios',
          payload: 'HORARIOS_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Comprar',
          payload: 'ABOUT_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Facturación',
          payload: 'FACTURACION_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Destinos',
          payload: 'DESTINOS_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Contacto',
          payload: 'CONTACTO_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Vacantes',
          payload: 'VACANTES_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Servicios',
          payload: 'SERVICIOS_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Paquetería',
          payload: 'PAQUETERIA_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Turismo',
          payload: 'TURISMO_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Equipaje Perdido',
          payload: 'AUDITORIA_PAYLOAD',
        },
      ],
    },
  };
  // senderActions(senderId);
  // setTimeout(() => {
  callSendApi(messageData);
  // }, Math.floor(Math.random() * 5) * 1000);
}

function senderActions(senderId, payload) {
  const messageData = {
    recipient: {
      id: senderId,
    },
    sender_action: 'typing_on',
  };
  callSendApi(messageData);
}

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
        console.log('message sent!');
      } else {
        console.error('Unable to send message:' + err);
      }
    },
  );
}

app.listen(process.env.PORT, function () {
  console.log(
    'Nuestro servidor está funcionando en el puerto',
    process.env.PORT,
  );
});
