const express = require('express'),
      methodOverride = require('method-override'),
      bodyParser = require('body-parser'),
      favicon = require('serve-favicon'),
      app = module.exports = express(),
      router = express.Router()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(express.static(__dirname + '/'))
app.use(favicon(__dirname + '/src/front/assets/logo.png'))

var port = process.env.PORT || 8080
var env = process.env.NODE_ENV

if('development' == env) {
    app.use(errorHandler({dumpExceptions: true, showStack: true}))
}
if('production' == app.get('env')) { app.use(errorHandler()) }

// Drop & create tables in DB
require('./src/back/models/createDatabase')

// Start server with 'node server.js'
var server = app.listen(port)

console.log('Server started at 127.0.0.1:8080')

var io = require('socket.io').listen(server)
require('./src/back/controllers/socket')(io)