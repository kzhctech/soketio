
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

axios.get('https://m.cricbuzz.com/cricket-commentary/36332/aus-vs-eng-1st-test-the-ashes-2021-22').then((response) => {
  // Load the web page source code into a cheerio instance
  const $ = cheerio.load(response.data);
  const urlElems = $('.list-content span:nth-child(5)').text();
  const status = $('.cbz-ui-status').text();

  const batsman1name = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(1)').text();
  const batsman2name = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(1)').text();
  const bowlername = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(1)').text();


  const batsman1run = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(2)').text();
  const batsman2run = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(2)').text();
  const bowlerwikwt = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(5)').text();
  const bowlerover = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(2)').text();


  const batTeam = $('#top h3.ui-li-heading span.miniscore-teams.ui-bat-team-scores').text();
  const bowlTeam = $('#top h3.ui-li-heading span.teamscores.ui-bowl-team-scores').text();
  const crr = $('#top .ui-match-scores-branding .crr').text();
  const commentry = $('#paginationList').first().first().first().first().children().first().first().children().children().children().children().children().first().text();

io.on('connection', (socket) => {
    console.log('a user connected');

    setInterval(function(){ 
           io.emit('message', {status,batTeam,commentry});   
    }, 30000);
    
    /*
    socket.on('message', (message) =>     {
      console.log(message);
           io.emit('message');   
    });
    */
});


});

http.listen(process.env.PORT, () => console.error('listening on http://localhost:3002/'));
console.error('socket.io example');


