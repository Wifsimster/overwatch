const errorHandler = require('./errorHandler')
const request = require('request')
const crypto = require('crypto')

const baseURL = 'http://mafreebox.freebox.fr/api/v3/'
const app_token = "3kYbyFKbG3GUi0LLV6C8HqPx8kwhbPfiXNI8fCW6pt4v57GmtpnAatkOXVwNjwXn"
const track_id = 7
const app_id = 'fr.freebox.overwatch'

module.exports = (socket) => {

    socket.on('freebox.getOne', () => {
        request(baseURL+'/api_version', (err, res, body) => {
            if(!err && res.statusCode === 200) {
                socket.emit('freebox.getOne.result', JSON.parse(body))
            } else {
                socket.emit('freebox.getOne.error', new errorHandler(err))
            }
        })
    })

    socket.on('freebox.setAutorize', () => {
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
            if(!err && res.statusCode === 200) {
                socket.emit('freebox.setAutorize.result', JSON.parse(body))
            } else {
                socket.emit('freebox.setAutorize.error', new errorHandler(err))
            }
        })
    })

    socket.on('freebox.getAutorize', (fn) => {
        request(baseURL+'login/authorize/'+track_id, (err, res, body) => {
            if(!err && res.statusCode === 200) {
                socket.emit('freebox.getAutorize.result', JSON.parse(body))
            } else {
                socket.emit('freebox.getAutorize.error', new errorHandler(err))
            }
        })
    })

    socket.on('freebox.login', (fn) => {
        request(baseURL+'login', (err, res, body) => {
            if(!err && res.statusCode === 200) {
                socket.emit('freebox.login.result', JSON.parse(body))
            } else {
                socket.emit('freebox.login.error', new errorHandler(err))
            }
        })
    })

    socket.on('freebox.openSession', (data) => {    
        const password = crypto.createHmac('sha1', app_token).update(data.challenge).digest('hex')
        request.post({
            headers: { 'Content-Type': 'application/json' },
            url: baseURL+'login/session',
            form: JSON.stringify({
                app_id: app_id,
                password: password
            })
        }, (err, res, body) => {
            if(!err && res.statusCode === 200) {
                socket.emit('freebox.openSession.result', JSON.parse(body))
            } else {
                socket.emit('freebox.openSession.error', new errorHandler(err))
            }
        })
    })

    socket.on('freebox.connection', (data) => {
        request({
            headers: { 'X-Fbx-App-Auth': data.token },
            url: baseURL+'connection'
        }, (err, res, body) => {
            if(!err && res.statusCode === 200) {
                socket.emit('freebox.connection.result', JSON.parse(body))
            } else {
                socket.emit('freebox.connection.error', new errorHandler(err))
            }
        })
    })

}