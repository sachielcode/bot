'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV == 'development') {
    require('dotenv').config();
}
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var request_1 = __importDefault(require("request"));
var access_token = process.env.ACCESS_TOKEN;
var app = express_1.default();
var destinos = require('./utils/horarios/destinos');
var horarios = require('./utils/horarios/horarios');
app.set('port', process.env.PORT || 5000);
app.use(body_parser_1.default.json());
app.get('/bot/', function (req, res) {
    res.send('Hola Mundo');
});
app.get('/bot/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    }
    else {
        res.send('Parhikuni Bot no tienes permisos');
    }
});
app.post('/bot/webhook', function (req, res) {
    var webhook_event = req.body.entry[0];
    if (webhook_event.messaging) {
        webhook_event.messaging.forEach(function (event) {
            handleEvent(event.sender.id, event);
        });
    }
    res.sendStatus(200);
});
function handleEvent(senderId, event) {
    if (event.message) {
        handleMessage(senderId, event.message);
    }
    else if (event.postback) {
        handlePostback(senderId, event.postback.payload);
    }
    else if (event.message.quick_reply) {
        handleQuickReply(senderId, event.message.quick_reply.payload);
    }
    else {
        defaultMessage(senderId);
    }
}
function handleQuickReply(senderId, payload) {
    var payloadArr = payload.split('_');
    if (payload === 'HORARIOS_PAYLOAD') {
        callSendApi(horarios.origenes(senderId, destinos.destinos()));
    }
    else if (payloadArr[1] === 'ORIGEN') {
        var origen = payloadArr[0];
        callSendApi(horarios.destino(senderId, destinos.destinos(origen), origen));
    }
    else if (payloadArr[1] === 'DESTINO') {
        var origen = payloadArr[0];
        var destino = payloadArr[2];
        horarios.consultarHorarios(senderId, origen, destino);
        //callSendApi(horarios.consultarHorarios(senderId, origen, destino));
    }
    else if (payload === 'DESTINOS_PAYLOAD') {
        callSendApi(destinos.listaDestinos(senderId));
    }
    else if (payload === 'FACTURACION_PAYLOAD') {
        console.log('FACTURACION_PAYLOAD');
    }
    else if (payload === 'CONTACTO_PAYLOAD') {
        console.log('CONTACTO_PAYLOAD');
    }
    else if (payload === 'VACANTES_PAYLOAD') {
        console.log('VACANTES_PAYLOAD');
    }
    else if (payload === 'SERVICIOS_PAYLOAD') {
        console.log('SERVICIOS_PAYLOAD');
    }
    else if (payload === 'PAQUETERIA_PAYLOAD') {
        console.log('PAQUETERIA_PAYLOAD');
    }
    else if (payload === 'TURISMO_PAYLOAD') {
        console.log('TURISMO_PAYLOAD');
    }
    else if (payload === 'AUDITORIA_PAYLOAD') {
        console.log('AUDITORIA_PAYLOAD');
    }
    else if (payload === 'INICIO_PAYLOAD') {
        defaultMessage(senderId);
    }
}
function handlePostback(senderId, payload) {
    switch (payload) {
        case 'INICIO_PAYLOAD':
            defaultMessage(senderId);
            break;
        default:
            break;
    }
}
function handleMessage(senderId, event) {
    if (event.quick_reply) {
        handleQuickReply(senderId, event.quick_reply.payload);
    }
    else if (event.text) {
        // Mensaje por default
        defaultMessage(senderId);
    }
    else {
        // Otro mensaje
        var messageData_1 = {
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
        senderActions(senderId, '');
        setTimeout(function () {
            callSendApi(messageData_1);
        }, Math.floor(Math.random() * 5) * 1000);
    }
}
function defaultMessage(senderId) {
    var messageData = {
        recipient: {
            id: senderId,
        },
        message: {
            text: 'Hola soy un bot de messenger y te invito a utilizar nuestro menú',
            quick_replies: [
                {
                    content_type: 'text',
                    title: 'Destinos',
                    payload: 'DESTINOS_PAYLOAD',
                },
                {
                    content_type: 'text',
                    title: 'Horarios',
                    payload: 'HORARIOS_PAYLOAD',
                },
                {
                    content_type: 'text',
                    title: 'Facturación',
                    payload: 'FACTURACION_PAYLOAD',
                },
                {
                    content_type: 'text',
                    title: 'Contacto',
                    payload: 'CONTACTO_PAYLOAD',
                },
                {
                    content_type: 'text',
                    title: 'Renta autobuses',
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
    var messageData = {
        recipient: {
            id: senderId,
        },
        sender_action: 'typing_on',
    };
    callSendApi(messageData);
}
function callSendApi(response) {
    request_1.default({
        uri: 'https://graph.facebook.com/v8.0/me/messages/',
        qs: { access_token: access_token },
        method: 'POST',
        json: response,
    }, function (err, res, body) {
        if (!err) {
            console.log('message sent!');
        }
        else {
            console.error('Unable to send message:' + err);
        }
    });
}
app.listen(process.env.PORT, function () {
    console.log('Nuestro servidor está funcionando en el puerto', process.env.PORT);
});
