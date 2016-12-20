var express    = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon');

var app = module.exports = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/'));
app.use(express.static('dist/uploads'));
app.use(favicon(__dirname + '/src/assets/logo.png'));

var port = process.env.PORT || 8080;
var env = process.env.NODE_ENV;

// REST routes
//app.use('/api', require('./src/api/routes'));
//app.use('/api/user', require('./src/api/user'));

if('development' == env) {
  app.use(errorHandler({dumpExceptions: true, showStack: true}));
}
if('production' == app.get('env')) {app.use(errorHandler());}

// Drop & create tables in DB
//require('./src/models/createDatabase');

// Start server with 'node server.js'
app.listen(port);
console.log('Server started at 127.0.0.1:8080');