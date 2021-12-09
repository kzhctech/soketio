
const cheerio = require('cheerio');
const axios = require('axios');

var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http,{
    cors: { origin: "*" }
});
app.get('/*', (req, res) => {
  console.error('express connection');
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) =>     {
      console.log(message);
        status = 'hey';
        io.emit('message', `Status ${status}` );   
    });
});



http.listen(process.env.PORT, () => console.error('listening on http://localhost:3002/'));
console.error('socket.io example');
