var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require("path");
server.listen(4040);

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, '/public'))); 


io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('emitClient', (data) => {
    console.log(data.my);
  }); 
});  