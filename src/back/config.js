const Configstore = require('configstore')

const configuration = {
  datetime: {
    display: true,
  },
  esp8266: {
    display: true,
  },
  netatmo: {
    display: true,
    client_id: "586274dec4978493ab8ba235",
    client_secret: "UdxSaUVTgRNuJ6fOPKQECM9ZMzQ4X1Jxbn",
    username: "wifsimster@gmail.com",
    password: "192lucie"
  },
  freebox: {
    display: true,
    baseURL: "http://mafreebox.freebox.fr/api/v3/",
    app_token: "3kYbyFKbG3GUi0LLV6C8HqPx8kwhbPfiXNI8fCW6pt4v57GmtpnAatkOXVwNjwXn",
    track_id: 7,
    app_id: "fr.freebox.overwatch",
  },
  google: {
    dispaly: true,
    email: "wifsimster@gmail.com",
  }
}

const conf = new Configstore('overwatch_confi', configuration)