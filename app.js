var express = require('express');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var index = require('./routes/index');
var app = express();
var socketio = require('socket.io');
var device = require('express-device');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(device.capture());
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, '')));
app.use(express.favicon());

device.enableDeviceHelpers(app);
device.enableViewRouting(app);

app.use(express.errorHandler());


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.index);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var formServer = require('./lib/form_server');
formServer.listen(server, socketio);