const errorHandler = require('./errorHandler')
const request = require('request')
const crypto = require('crypto')

const baseURL = 'http://mafreebox.freebox.fr/api/v3/'
const app_token = "3kYbyFKbG3GUi0LLV6C8HqPx8kwhbPfiXNI8fCW6pt4v57GmtpnAatkOXVwNjwXn"
const track_id = 7
const app_id = 'fr.freebox.overwatch'

module.exports = function(socket) {

  socket.on('get.freebox.info', (fn) => {
    request(baseURL+'/api_version', (err, res, body) => {
      if(!err && res.statusCode == 200) {
        fn(JSON.parse(body))
      } else {
        fn(err)
      }
    })
  })

  socket.on('request.freebox.autorize', (fn) => {
    const data = {
      app_id: app_id,
      app_name: 'Overwatch',
      app_version: '1.0.0',
      device_name: 'Overwatch'
    }
    request.post({
      headers: { 'Content-Type': 'application/json' },
      url: baseURL + 'login/authorize',
      form: JSON.stringify({
        app_id: "fr.freebox.overwatch",
        app_name: "Overwatch",
        app_version: "0.1",
        device_name: "Overwatch"
      }),
    }, (err, res, body) => {
      fn(JSON.parse(body))
    })
  })

  socket.on('get.freebox.autorize', (fn) => {
    request(baseURL+'login/authorize/'+track_id, (err, res, body) => {
      fn(JSON.parse(body))
    })
  })

  socket.on('get.freebox.login', (fn) => {
    request(baseURL+'login', (err, res, body) => {
      fn(JSON.parse(body))
    })
  })

  socket.on('open.freebox.session', (data, fn) => {    
    const password = crypto.createHmac('sha1', app_token).update(data.challenge).digest('hex')
    request.post({
      headers: { 'Content-Type': 'application/json' },
      url: baseURL+'login/session',
      form: JSON.stringify({
        app_id: app_id,
        password: password
      })
    }, (err, res, body) => {
      fn(JSON.parse(body))
    })
  })

  socket.on('get.freebox.connection', (data, fn) => {
    request({
      headers: { 'X-Fbx-App-Auth': data.token },
      url: baseURL+'connection'
    }, (err, res, body) => {
      fn(JSON.parse(body))
    })
  })

}