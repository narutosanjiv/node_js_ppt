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

app.get('/', function(request, response) {
  response.sendfile(__dirname + "/index.html");
});

var io = socket.listen(server);
server.listen(8080);


io.sockets.on('connection', function(socket) {
  console.log('Client connected...');

  socket.on('addme',function(username) {
    socket.username = username;
    socket.emit('chat', 'SERVER', 'You have connected');
    socket.broadcast.emit('chat', 'SERVER', username + ' is on deck');
  });
  socket.on('sendchat', function(data) {
    io.sockets.emit('chat', socket.username, data);
  });
  socket.on('disconnect', function() {
    io.sockets.emit('chat', 'SERVER', socket.username + ' has left the building');
  });

});


