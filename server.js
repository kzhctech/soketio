var mongoose = require('mongoose');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: "*" }
});
app.use(express.json());
const ejs = require('ejs');
const cheerio = require('cheerio')
const axios = require('axios')



const { kStringMaxLength } = require('buffer'); 

 const bodyParser = require('body-parser');

    app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }));







app.use('/static', express.static('public'))

app.set('view engine', 'ejs');


// make a connection 
mongoose.connect('mongodb+srv://kzhccric:2FQHi2IPGWdllW21@cluster0.v6byg.mongodb.net/kzhcCric?retryWrites=true&w=majority');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));

    // define Schema
    var MatchSchema = mongoose.Schema({
      name: String,
      team1name: String,
      team1flug: String,
      team1run: String,
      team2name: String,
      team2flug: String,
      team2run: String,
      status: String,
      bat1name: String,
      bat1run: String,
      bat1ball: String,
      bat2name: String,
      bat2run: String,
      bat2ball: String,
      ballname: String,
      ballover: String,
      ballwk: String
    });

    // compile schema to model
    var Match = mongoose.model('Match', MatchSchema, 'Matchstore');
 


    // define Schema
    var NewsSchema = mongoose.Schema({
      title: String,
      author: String,
      date: String,
      content: String,
      thumb:String
    });
 
    // compile schema to model
    var News = mongoose.model('News', NewsSchema, 'Newstore');
 



    // define Schema
    var matchLink = mongoose.Schema({
      link:String
    });
 
    // compile schema to model
    var Link = mongoose.model('Link', matchLink, 'linkstore');



    // define Schema
    var BookSchema = mongoose.Schema({
      name: String,
      price: Number,
      quantity: Number
    });
 
    // compile schema to model
    var Book = mongoose.model('Book', BookSchema, 'bookstore');
 

app.get('/link', (req, res) => {
    Link.find({}, function(err, link) {
        res.render('link', {
           link: link[0]
        })
    })
})




app.post('/link',(req,res) => {  

	console.log(req.body.link)


    // a document instance

    var link1 = new Link({ link: req.body.link });
 
    // save model to database

    link1.save(function (err, book) {
      if (err) return console.error(err);
      console.log(req.body.link + " saved to link collection.");
	res.redirect('/');
    });




})

app.post('/linkup', (req, res) => {

Link.findByIdAndUpdate(req.body.id,{
		link: req.body.link

}, function(err, result){

        if(err){
            res.send(err)
        }
        else{
            res.redirect('/link')
        }

    })




})

app.get('/live', (req, res) => {
    

Link.find({}, function(err, link) {

var cmnty = '';
console.log(link[0].link);
axios.get(link[0].link).then((response) => {
  // Load the web page source code into a cheerio instance

  

  const $ = cheerio.load(response.data);
  const urlElems = $('.list-content span:nth-child(5)').text();
  const status = $('.cbz-ui-status').text();

  const title = $('#top').find('div').find('div:nth-child(9)').find('h4').text();
  const batsman1name = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(1)').text();
  const batsman2name = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(1)').text();
  const bowlername = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(1)').text();


  const batsman1run = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(2)').text();
  const batsman2run = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(2)').text();
  const bowlerwikwt = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(5)').text();
  const bowlerover = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(2)').text();

  const lbb = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(8)').text();
  const batTeam = $('#top h3.ui-li-heading span.miniscore-teams.ui-bat-team-scores').text();
  const bowlTeam = $('#top h3.ui-li-heading span.teamscores.ui-bowl-team-scores').text();
  const crr = $('#top .ui-match-scores-branding .crr').text();
  var commentry = $('#paginationList').find('div').find('div:nth-child(3)').text();
  const commentry2 = $('#paginationList').find('div').find('div:nth-child(5)').text();
if  (!commentry ){
 commentry =commentry2;
}

var BatNameRun = batTeam.split(' ');
var BowlNameRun = bowlTeam.split(' ');


 res.render('live', {
           Title:title,
	   Status:status,
           BatName: BatNameRun[0],
           BatRun: `${BatNameRun[2]} ${BatNameRun[3]}  ${BatNameRun[4]}  ${BatNameRun[5]}  `,
	   BatOver:BatNameRun[3],
           BowlName: BowlNameRun[0],
           BowlRun:BowlNameRun[2],
	   BowlOver:BowlNameRun[3],
	   Bat1Name:batsman1name,
	   Bat1Run:batsman1run,
	   Bat2Name:batsman2name,
	   Bat2Run:batsman2run,
	   BowlerName:bowlername,
	   BowlerOver:bowlerover,
	   BowlerWK:bowlerwikwt,
     LBB:lbb

        })



});

    })



})



app.get('/', (req, res) => {
    Match.find({}, function(err, match) {

Link.find({}, function(err, link) {

var cmnty = '';
console.log(link[0].link);
axios.get(link[0].link).then((response) => {
  // Load the web page source code into a cheerio instance

  

  const $ = cheerio.load(response.data);
  const urlElems = $('.list-content span:nth-child(5)').text();
  const status = $('.cbz-ui-status').text();

  const title = $('#top').find('div').find('div:nth-child(9)').find('h4').text();
  const batsman1name = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(1)').text();
  const batsman2name = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(1)').text();
  const bowlername = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(1)').text();


  const batsman1run = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(2)').text();
  const batsman2run = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(2)').text();
  const bowlerwikwt = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(5)').text();
  const bowlerover = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(2)').text();

  const lbb = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(8)').text();
  const batTeam = $('#top h3.ui-li-heading span.miniscore-teams.ui-bat-team-scores').text();
  const bowlTeam = $('#top h3.ui-li-heading span.teamscores.ui-bowl-team-scores').text();
  const crr = $('#top .ui-match-scores-branding .crr').text();
  var commentry = $('#paginationList').find('div').find('div:nth-child(3)').text();
  const commentry2 = $('#paginationList').find('div').find('div:nth-child(5)').text();
if  (!commentry ){
 commentry =commentry2;
}

var BatNameRun = batTeam.split(' ');
var BowlNameRun = bowlTeam.split(' ');

 res.render('newindex', {
          matchList: match,
	   Title:title,
           Status:status,
           BatName: BatNameRun[0],
           BatRun:BatNameRun[2],
	   BatOver:BatNameRun[3],
           BowlName: BowlNameRun[0],
           BowlRun:BowlNameRun[2],
	   BowlOver:BowlNameRun[3]
        })


  //console.log(commentry);
  //console.log(commentry2);



 
/*
  console.log('Title:',title);
  console.log(' ');
  console.log('Status:',status);
  console.log(' ');
  console.log('Bat:',batTeam,'CRR:',crr);
  console.log(' ');
  console.log('Last Balls :',lbb);
  console.log(' ');
  console.log(batsman1name,'Run:',batsman1run);
  console.log(' ');
  console.log(batsman2name,'Run:',batsman2run);
  console.log(' ');
  console.log(bowlername,'Over',bowlerover,'Wicket',bowlerwikwt);
  console.log(' ');
  console.log(commentry);
*/

});


    
    })
})

})

app.post('/edit', (req, res) => {

Match.findByIdAndUpdate(req.body.id,{
		name: req.body.name , 
		team1name: req.body.team1name,
		team1flug: req.body.team1flug,
		team1run: req.body.team1run,
		team2name: req.body.team2name,
		team2flug: req.body.team2flug,
		team2run: req.body.team2run,
		status: req.body.status,
		bat1name: req.body.bat1name,
		bat1run: req.body.bat1run,
		bat1ball: req.body.bat1ball,
		bat2name: req.body.bat2name,
		bat2run: req.body.bat2run,
		bat2ball: req.body.bat2ball,
		ballname: req.body.ballname,
		ballover: req.body.ballover,
		ballwk: req.body.ballwk	

}, function(err, result){

        if(err){
            res.send(err)
        }
        else{
            res.redirect('/match')
        }

    })




})



app.post('/editm', (req, res) => {
console.log(req.body.id)  
Match.find({_id:req.body.id}, function(err, match) {

	console.log(match[0].name)  
        res.render('edit', {
           match: match[0]
        })
    })
});


app.get('/match/:id', function(req, res) {
  //res.send("tagId is set to " + req.params.id);
Match.find({_id:req.params.id}, function(err, match) {
	console.log(match[0].name)  
        res.render('onematch', {
           match: match[0]
        })
    })

});


app.get('/match', (req, res) => {


    Match.find({}, function(err, match) {

    Book.find({}, function(err, book) {
        res.render('match', {
            bookList: book,
	    matchList: match
        })
    })
    })
})


app.post('/addm',(req,res) => {  

	console.log(req.body.name,req.body.team1name,req.body.team2name)


    // a document instance
    var match1 = new Match({ 
		name: req.body.name , 
		team1name: req.body.team1name,
		team1flug: req.body.team1flug,
		team1run: req.body.team1run,
		team2name: req.body.team2name,
		team2flug: req.body.team2flug,
		team2run: req.body.team2run,
		status: req.body.status,
		bat1name: req.body.bat1name,
		bat1run: req.body.bat1run,
		bat1ball: req.body.bat1ball,
		bat2name: req.body.bat2name,
		bat2run: req.body.bat2run,
		bat2ball: req.body.bat2ball,
		ballname: req.body.ballname,
		ballover: req.body.ballover,
		ballwk: req.body.ballwk		
 });
 
    // save model to database
    match1.save(function (err, match) {
      if (err) return console.error(err);
      console.log(req.body.name +  " saved to Match collection.",req.body.team1run);
	res.redirect('/match');
    });




})




app.post('/add',(req,res) => {  

	console.log(req.body.name,req.body.price,req.body.quantity)


    // a document instance
    var book1 = new Book({ name: req.body.name , price: req.body.price, quantity: req.body.quantity });
 
    // save model to database
    book1.save(function (err, book) {
      if (err) return console.error(err);
      console.log(req.body.name + " saved to bookstore collection.");
	res.redirect('/');
    });




})



app.post('/del', (req, res) => {
  res.redirect('/');
  console.log(req.body.id);
    Book.remove({_id:req.body.id}, function(err){
    if(err) throw err;
});


});



app.post('/delm', (req, res) => {
  res.redirect('/match');
  console.log(req.body.id);
    Match.remove({_id:req.body.id}, function(err){
    if(err) throw err;
});





});

io.on('connection', (socket) => {
  console.log('a user connected');





 setInterval(function(){
  Link.find({}, function(err, link) {

    var cmnty = '';
    //console.log(link[0].link);
    axios.get(link[0].link).then((response) => {
      // Load the web page source code into a cheerio instance
    
      
    
      const $ = cheerio.load(response.data);
      const urlElems = $('.list-content span:nth-child(5)').text();
      const status = $('.cbz-ui-status').text();
    
      const title = $('#top').find('div').find('div:nth-child(9)').find('h4').text();
      const batsman1name = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(1)').text();
      const batsman2name = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(1)').text();
      const bowlername = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(1)').text();
    
    
      const batsman1run = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(2)').text();
      const batsman2run = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(2)').text();
      const bowlerwikwt = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(5)').text();
      const bowlerover = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(2)').text();
    
      const lbb = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(8)').text();
      const batTeam = $('#top h3.ui-li-heading span.miniscore-teams.ui-bat-team-scores').text();
      const bowlTeam = $('#top h3.ui-li-heading span.teamscores.ui-bowl-team-scores').text();
      const crr = $('#top .ui-match-scores-branding .crr').text();
      var commentry = $('#paginationList').find('div').find('div:nth-child(3)').text();
      const commentry2 = $('#paginationList').find('div').find('div:nth-child(5)').text();
    if  (!commentry ){
     commentry =commentry2;
    }
    
    var BatNameRun = batTeam.split(' ');
    var BowlNameRun = bowlTeam.split(' ');
    
    
    
    io.emit('message', {commentry,batTeam:`${BatNameRun[2]} ${BatNameRun[3]}  ${BatNameRun[4]}  ${BatNameRun[5]} `,status,batsman1name,batsman1run,batsman2name,batsman2run,bowlername,bowlerover,bowlerwikwt,lbb} );  
    
    
    
    });
    
        })

 },9000)




  socket.on('message', (message) =>     {
      console.log(message);
      io.emit('message', message );   
  });
});


server.listen(process.env.PORT || 4000, function() {
  console.log('server is running');
});

