
const cheerio = require('cheerio');
const axios = require('axios');

var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http,{
    cors: { origin: "*" }
});


app.get('/', (req, res) => {
  console.error('express connection');
  res.sendFile(path.join(__dirname, 'index.html'));
});




app.get('/cric', function (req, res) {




axios.get('https://m.cricbuzz.com/cricket-commentary/40536/nz-vs-ban-1st-test-bangladesh-tour-of-new-zealand-2022').then((response) => {

  const $ = cheerio.load(response.data);

  const status = $('.cbz-ui-status').text();
  const title = $('#top').find('div').find('div:nth-child(9)').find('h4').text();

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
  const lbb = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(8)').text();
  const commentry = $('#paginationList').first().first().first().first().children().first().first().children().children().children().children().children().first().text();
 
  console.log('Title:',title);
  console.log(' ');
  console.log('Status:',status);
  console.log(' ');
  console.log('Bat:',batTeam,'CRR:',crr);
  console.log(' ');
  console.log(batsman1name,'Run:',batsman1run);
  console.log(' ');
  console.log(batsman2name,'Run:',batsman2run);
  console.log(' ');
  console.log(bowlername,'Over',bowlerover,'Wicket',bowlerwikwt);
  console.log(' ');
  console.log(commentry);

   res.send( `Status ${status}`);
   //res.sendFile(path.join(__dirname, 'index.html'));
});

});




    
io.on('connection', (socket) => {
  
  console.log('a user connected');
   
setInterval(function () {
  let cmnty = '';
    
  axios.get('https://m.cricbuzz.com/cricket-commentary/40536/nz-vs-ban-1st-test-bangladesh-tour-of-new-zealand-2022').then((response) => {
      
  // Load the web page source code into a cheerio instance
      
  const $ = cheerio.load(response.data);
 
  const status = $('.cbz-ui-status').text();

  const title = $('#top').find('div').find('div:nth-child(9)').find('h4').text();
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
  const lbb = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(8)').text();
  
      if(commentry != cmnty){
          cmnty = commentry;
   io.emit('message', {title,lbb,status,batTeam,commentry,batsman1name,batsman1run,batsman2name,batsman2run,bowlername,bowlerwikwt,bowlerover}); 
      
      }
  

      
  });

},20000);
   
});

http.listen(process.env.PORT, () => console.error('listening on http://localhost:3002/'));
console.error('socket.io example');


