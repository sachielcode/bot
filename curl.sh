
curl -X POST -H "Content-Type: application/json" -d '{
  "get_started": {"payload": "GET_STARTED_SACHIELBOT"}
}' "https://graph.facebook.com/v8.0/me/messenger_profile?access_token=EAAL7MZBPHbTsBAMsEh3ApZAbMujdEyJ3sMyme0HZCj5MzoZBVTmDeJCDwFtH6rTGRXWf0wYAdcfHgE8cZChHZA5EPpB6ZCh1yfDAy2kYEZC9PNky2XTuQiUlW8JOdgZA7uLqMhzZA5LZAjEepEywQqWXVAtZC8dgrna29yAjLetOR4upiAZDZD"


curl -X POST -H "Content-Type: application/json" -d '{
"greeting": [{
  "locale": "default",
  "text": "Hola {{user_first_name}} soy SachielBot! 🤖"
}, {
  "locale": "en_US",
  "text": "Hello {{user_first_name}} I am SachielBot! 🤖"
}]
}
' "https://graph.facebook.com/v8.0/me/messenger_profile?access_token=EAAL7MZBPHbTsBAMsEh3ApZAbMujdEyJ3sMyme0HZCj5MzoZBVTmDeJCDwFtH6rTGRXWf0wYAdcfHgE8cZChHZA5EPpB6ZCh1yfDAy2kYEZC9PNky2XTuQiUlW8JOdgZA7uLqMhzZA5LZAjEepEywQqWXVAtZC8dgrna29yAjLetOR4upiAZDZD"


curl -X POST -H "Content-Type: application/json" -d '{
"persistent_menu": [{
  "locale": "default",
  "composer_input_disabled": true,
      "call_to_actions": [{
          "title": "Acerca",
          "type": "postback",
          "payload": "ABOUT_PAYLOAD"
        },
        {
          "title": "Sucursales",
          "type": "postback",
          "payload": "LOCATIONS_PAYLOAD"
        },
        {
          "title": "Ayuda",
          "type": "postback",
          "payload": "HELP_PAYLOAD"
        },
        {
          "title": "Contacto",
          "type": "postback",
          "payload": "CONTACT_PAYLOAD"
        },
        {
          "type": "web_url",
          "title": "🐶 Pagina Web",
          "url": "http://platzi.com/bots-messenger/",
          "webview_height_ratio": "full"
        }
      ]
}]
}
' "https://graph.facebook.com/v8.0/me/messenger_profile?access_token=EAAL7MZBPHbTsBAMsEh3ApZAbMujdEyJ3sMyme0HZCj5MzoZBVTmDeJCDwFtH6rTGRXWf0wYAdcfHgE8cZChHZA5EPpB6ZCh1yfDAy2kYEZC9PNky2XTuQiUlW8JOdgZA7uLqMhzZA5LZAjEepEywQqWXVAtZC8dgrna29yAjLetOR4upiAZDZD"



curl -X DELETE -H "Content-Type: application/json" -d '{
"setting_type": "call_to_actions",
"thread_state": "existing_thread"
}
' "https://graph.facebook.com/v8.0/me/thread_settings?access_token=EAAL7MZBPHbTsBAMsEh3ApZAbMujdEyJ3sMyme0HZCj5MzoZBVTmDeJCDwFtH6rTGRXWf0wYAdcfHgE8cZChHZA5EPpB6ZCh1yfDAy2kYEZC9PNky2XTuQiUlW8JOdgZA7uLqMhzZA5LZAjEepEywQqWXVAtZC8dgrna29yAjLetOR4upiAZDZD"



curl -X POST -H "Content-Type: application/json" -d '{
  "whitelisted_domains":[
    "https://www.parhikuni.com/",
  ]
}' "https://graph.facebook.com/v8.0/me/messenger_profile?access_token=EAAL7MZBPHbTsBAMsEh3ApZAbMujdEyJ3sMyme0HZCj5MzoZBVTmDeJCDwFtH6rTGRXWf0wYAdcfHgE8cZChHZA5EPpB6ZCh1yfDAy2kYEZC9PNky2XTuQiUlW8JOdgZA7uLqMhzZA5LZAjEepEywQqWXVAtZC8dgrna29yAjLetOR4upiAZDZD"