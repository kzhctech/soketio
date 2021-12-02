/*
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('hello')
})

app.listen(process.env.PORT, function () {
  console.log('Listening on port 3000...')
})
*/
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', (req, res) => {
  console.error('express connection');
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
    });
});

http.listen(process.env.PORT, () => console.error('listening on http://localhost:3002/'));
console.error('socket.io example');
