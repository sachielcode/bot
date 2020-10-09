'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const access_token = process.env.ACCESS_TOKEN;
const app = express();

app.set('port', process.env.NODE_PORT);
app.use(bodyParser.json());

app.get('/bot/', function (req, res) {
  res.send(access_token);
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
      //console.log(webhook_event.messaging)
      handleEvent(event.sender.id, event);
    });
  }
  res.sendStatus(200);
});

function handleMessage(senderId, event) {
  if (event.text) {
    defaultMessage(senderId);
  }
}

function defaultMessage(senderId) {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      text: 'Hola soy un bot de messenger y te invito a utilizar nuestro menú',
    },
  };
  callSendApi(messageData);
}

function handleEvent(senderId, event) {
  if (event.message) {
    handleMessage(senderId, event.message);
  } else if (event.postback) {
    handlePostback(senderId, event.postback.payload);
  }
}

function handlePostback(senderId, payload) {
  switch (payload) {
    case 'GET_STARTED_SACHIELBOT':
      console.log(payload);
      break;

    default:
      break;
  }
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

app.listen(app.get('port'), function () {
  console.log(
    'Nuestro servidor está funcionando en el puerto',
    app.get('port'),
  );
});
