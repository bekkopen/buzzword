
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var fs = require('fs');
var socketio = require('socket.io');
var http = require('http');

var app = express();

server = http.createServer(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'mustache');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

var port = process.env.PORT || 3000;

server.listen(port, function(){
  console.log("Express server listening on port %d", port);
});


var io = socketio.listen(server);
var questions;
fs.readFile('./questions.json',  function(err, data){
  if(!err){
    questions = JSON.parse(data);
  }
});

// {
// id: {nickname: @nickname}
//}
var connections = {};


io.sockets.on('connection', function (socket) {
  console.log("new connection");

  connections[socket.id] = {};

  console.log(connections);

  //socket.emit('question', questions[0]);

  socket.on("login", function(data, fn) {
    console.log(data)

    var me = connections[socket.id];
    var nickname = data.nickname;

    me.nickname = data.nickname;

    console.log(connections);

    fn(true);
  });

  socket.on("users", function(data, fn) {

    console.log("wants users: " +data);

    var users = [];

    for (var connection in connections) {
      users.push(connections[connection]);
    }

    fn(users);

  });

});
