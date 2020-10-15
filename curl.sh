
curl -X POST -H "Content-Type: application/json" -d '{
  "get_started": {"payload": "INICIO_PAYLOAD"}
}' "https://graph.facebook.com/v8.0/me/messenger_profile?access_token=EAAL7MZBPHbTsBAF8qc8YEzuOF9Ez5vz5mTB1TfYyUk7IT03rfFOZBGonVXx3rB5QqmWqtefcPSiPCKj0hyAmwNbfQUZAgz2d8HMRWFtqJBo5rMuSejfTIte4vIJQbBLWuZA88VNVlvXGIS7iEQ7x2ZAbQ7ETZBEc6F0sRL6x1W2QZDZD"


curl -X POST -H "Content-Type: application/json" -d '{
"greeting": [{
  "locale": "default",
  "text": "Hola {{user_first_name}} soy SachielBot! 🤖"
}, {
  "locale": "en_US",
  "text": "Hello {{user_first_name}} I am SachielBot! 🤖"
}]
}
' "https://graph.facebook.com/v8.0/me/messenger_profile?access_token=EAAL7MZBPHbTsBAF8qc8YEzuOF9Ez5vz5mTB1TfYyUk7IT03rfFOZBGonVXx3rB5QqmWqtefcPSiPCKj0hyAmwNbfQUZAgz2d8HMRWFtqJBo5rMuSejfTIte4vIJQbBLWuZA88VNVlvXGIS7iEQ7x2ZAbQ7ETZBEc6F0sRL6x1W2QZDZD"


curl -X POST -H "Content-Type: application/json" -d '{
"persistent_menu": [{
  "locale": "default",
  "composer_input_disabled": false,
      "call_to_actions": [{
          "title": "Paquetería",
          "type": "postback",
          "payload": "PAQUETERIA_PAYLOAD"
        },
        {
          "title": "Sucursales",
          "type": "postback",
          "payload": "SUCURSALES_PAYLOAD"
        },
        {
          "title": "Vacantes",
          "type": "postback",
          "payload": "HELP_PAYLOAD"
        },
        {
          "title": "Clases de servicios",
          "type": "postback",
          "payload": "SERVICIOS_PAYLOAD"
        },
        {
          "type": "web_url",
          "title": "🚌 Pagina Web",
          "url": "https://parhikuni.com.mx/",
          "webview_height_ratio": "full"
        }
      ]
}]
}
' "https://graph.facebook.com/v8.0/me/messenger_profile?access_token=EAAL7MZBPHbTsBAF8qc8YEzuOF9Ez5vz5mTB1TfYyUk7IT03rfFOZBGonVXx3rB5QqmWqtefcPSiPCKj0hyAmwNbfQUZAgz2d8HMRWFtqJBo5rMuSejfTIte4vIJQbBLWuZA88VNVlvXGIS7iEQ7x2ZAbQ7ETZBEc6F0sRL6x1W2QZDZD"



curl -X DELETE -H "Content-Type: application/json" -d '{
"setting_type": "call_to_actions",
"thread_state": "existing_thread"
}
' "https://graph.facebook.com/v8.0/me/thread_settings?access_token=EAAL7MZBPHbTsBAF8qc8YEzuOF9Ez5vz5mTB1TfYyUk7IT03rfFOZBGonVXx3rB5QqmWqtefcPSiPCKj0hyAmwNbfQUZAgz2d8HMRWFtqJBo5rMuSejfTIte4vIJQbBLWuZA88VNVlvXGIS7iEQ7x2ZAbQ7ETZBEc6F0sRL6x1W2QZDZD"



curl -X POST -H "Content-Type: application/json" -d '{
  "whitelisted_domains":[
    "https://www.parhikuni.com/",
  ]
}' "https://graph.facebook.com/v8.0/me/messenger_profile?access_token=EAAL7MZBPHbTsBAF8qc8YEzuOF9Ez5vz5mTB1TfYyUk7IT03rfFOZBGonVXx3rB5QqmWqtefcPSiPCKj0hyAmwNbfQUZAgz2d8HMRWFtqJBo5rMuSejfTIte4vIJQbBLWuZA88VNVlvXGIS7iEQ7x2ZAbQ7ETZBEc6F0sRL6x1W2QZDZD"