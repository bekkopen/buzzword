  
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , fs = require('fs');

var app = express();

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

app.get('/', function(request, response) {
  response.send('Hello World!');
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d", port);
});





var io = require('socket.io').listen(1337);
var questions;
fs.readFile('./questions.json',  function(err, data){
  if(!err){
    questions = JSON.parse(data);
  }
});

io.sockets.on('connection', function (socket) {
  socket.emit('question', question[Math.floor((Math.random()*questions.length ))]);
});
