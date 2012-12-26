var http = require('http')
var express = require('express');
var socket = require('socket.io');

var app = express();

app.configure(function(){
  //app.use(express.logger());  
  //app.use(express.methodOverride()); 
  //app.use(express.bodyDecoder()); 
  //app.use(app.router); 
  //app.use(express.staticProvider(__dirname + '/www/public')); 
  
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
});

var server = http.createServer(app);
var io = socket.listen(server);


server.listen(app.get('port'), function () {
      console.log("Express server listening on port " + app.get('port'));
});

app.get('/', function(request, response) {
  response.sendfile(__dirname + "/index.html");
});


io.sockets.on('connection', function(client) {
  console.log('Client connected...');
  client.emit('messages', { hello: 'world' });
});


