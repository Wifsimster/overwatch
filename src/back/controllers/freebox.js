const request = require('request-promise-native')
const crypto = require('crypto')

const baseURL = 'http://mafreebox.freebox.fr/api/v3/'
const app_token = '3kYbyFKbG3GUi0LLV6C8HqPx8kwhbPfiXNI8fCW6pt4v57GmtpnAatkOXVwNjwXn'
const track_id = 7
const app_id = 'fr.freebox.overwatch'

class Freebox {
  constructor() {}

  findOne() {
    request(baseURL + '/api_version', (err, res, body) => {
      if (!err && res.statusCode === 200) {
        socket.emit('freebox.getOne.result', JSON.parse(body))
      } else {
        socket.emit('freebox.getOne.error', err)
      }
    })
  }
}

module.exports = Freebox
