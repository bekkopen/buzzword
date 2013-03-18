  
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var fs = require('fs');
var socketio = require('socket.io');
var http = require('http');

var app = express();

server = http.createServer(app)

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

io.sockets.on('connection', function (socket) {
  console.log("new connection");
  socket.emit('question', questions[0]);
});
