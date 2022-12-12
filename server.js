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
      content: String,
      thumb:String
    },{timestamps: true});
 
    // compile schema to model
    var News = mongoose.model('News', NewsSchema, 'Newstore');


    // define Schema
    var MessageSchema = mongoose.Schema({
      name:String,
      message:String
    });
 
    // compile schema to model
    var Message = mongoose.model('Message', MessageSchema, 'Messagestore');
 

    // define Schema
    var matchLink = mongoose.Schema({
      link:String,
      ad:String
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

app.get('/news', (req, res) => {

  News.find({},null,{sort:{createdAt:-1}},function(err,news){
    res.render('news', {
         newslist: news
      })
      
      console.log(news)
    });
})




app.get('/addnews', (req, res) => {
  res.render('addnews')
})

app.post('/addnews', (req, res) => {
  

  var news1 = new News({ title:req.body.title,content:req.body.content,thumb:req.body.img,author:req.body.author });
 
  // save model to database

  news1.save(function (err, news) {
    if (err) return console.error(err);
    console.log('news' + " saved to link collection.");
res.redirect('/');
  });




})





app.post('/link',(req,res) => {  

	console.log(req.body.link);
  console.log(req.body.ad);

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
		link: req.body.link,
    ad:req.body.ad

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
    

  const protocol = req.protocol;
  const host = req.hostname;
  const port = process.env.PORT || 4000;

  let fullUrl = `https://${host}`

  if(!process.env.PORT){
    fullUrl = `${protocol}://${host}:${port}`
  }


Message.find({}, function(err, message) {
Link.find({}, function(err, link) {

var cmnty = '';
console.log(link[0].link);
axios.get(link[0].link).then((response) => {
  // Load the web page source code into a cheerio instance

  

  const $ = cheerio.load(response.data);
  const urlElems = $('.list-content span:nth-child(5)').text();
  const status = $('.cbz-ui-status').text();
  const title = $('#top').find('div').find('div:nth-child(9)').find('h4').text();

  const batTeam = $('#top h3.ui-li-heading span.miniscore-teams.ui-bat-team-scores').text();

  if (batTeam){
      
    const batsman1name = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(1)').text();
    const batsman2name = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(1)').text();
    const bowlername = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(1)').text();
  
  
    const batsman1run = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(2)').text();
    const batsman2run = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(2)').text();
    const bowlerwikwt = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(5)').text();
    const bowlerover = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(2)').text();
  
    var lbb = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(8)').text();
    if (!lbb){
      lbb = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(5)').text();
    }
    
    var pship = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(2)').text();
    var lw = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(5)').text();
    
    const bowlTeam = $('#top h3.ui-li-heading span.teamscores.ui-bowl-team-scores').text();
    const crr = $('#top .ui-match-scores-branding .crr').text();
    var commentry = $('#paginationList').find('div').find('div:nth-child(3)').text();
    const commentry2 = $('#paginationList').find('div').find('div:nth-child(5)').text();
  if  (!commentry ){
   commentry =commentry2;
  }
  
  var BatNameRun1 = batTeam.split(' ');
  var BatName1 = BatNameRun1[0];
  var BatRun1 = batTeam.replace(BatName1, "").replace('-', "");

  var BatNameRun2 = bowlTeam.split(' ');
  var BatName2 = BatNameRun2[0];
  var BatRun2 = bowlTeam.replace(BatName2, "").replace('-', "");


  res.render('live', {
    messagelist:message,
    URL:fullUrl,
      Title:title,
      Status:status,
      BatName: BatName1,
      BatRun: BatRun1,
      BowlName: BatName2,
      BowlRun:BatRun2,
      Bat1Name:batsman1name,
      Bat1Run:batsman1run,
      Bat2Name:batsman2name,
      Bat2Run:batsman2run,
      BowlerName:bowlername,
      BowlerOver:bowlerover,
      BowlerWK:bowlerwikwt,
      LBB:lbb,
      PS:pship,
      LW:lw,
      ad:link[0].ad
    })


    }
    
    else{
      const bat1run =  $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-match-scores-branding').find('div.col-xs-9.col-lg-9.dis-inline').find('h3').find('span:nth-child(1)').text();
      const bat2run =  $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-match-scores-branding').find('div.col-xs-9.col-lg-9.dis-inline').find('h3').find('span:nth-child(2)').text();
      //#top > div > div:nth-child(11) > div.cb-list-item.miniscore-data.ui-match-scores-branding > div > div.col-xs-9.col-lg-9.dis-inline > h3
      var BatNameRun1 = bat1run.split(' ');
      var BatName1 = BatNameRun1[0];
      var BatRun1 = bat1run.replace(BatName1, "").replace('-', "");

      var BatNameRun2 = bat2run.split(' ');
      var BatName2 = BatNameRun2[0];
      var BatRun2 = bat2run.replace(BatName2, "").replace('-', "");
  
      console.log(BatName1,':',BatRun1);
      console.log(BatName2,':',BatRun2);

      res.render('live', {
        messagelist:message,
        URL:fullUrl,
        Title:title,
        Status:status,
        Bat1Name:'',
        BatName: BatName1,
        BatRun: BatRun1,
        BowlName:BatName2,
        BowlRun:BatRun2,
        LBB:false
             })



    }





}).catch(function (error) {
    // handle error
//ok
    console.log('404');
  });

    });

  });



})



app.get('/', (req, res) => {


News.find({},null,{sort:{createdAt:-1}},function(err,news){
Match.find({}, function(err, match) {
Link.find({}, function(err, link) {

var cmnty = '';
console.log(link[0].link);
axios.get(link[0].link).then((response) => {
  // Load the web page source code into a cheerio instance

  

  const $ = cheerio.load(response.data);
  const urlElems = $('.list-content span:nth-child(5)').text();
  const status = $('.cbz-ui-status').text();

  const title = $('#top').find('div').find('div:nth-child(9)').find('h4').text()
  const batTeam = $('#top h3.ui-li-heading span.miniscore-teams.ui-bat-team-scores').text();


  if (batTeam){

    const batsman1name = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(1)').text();
    const batsman2name = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(1)').text();
    const bowlername = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(1)').text();
  
  
    const batsman1run = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(2)').text();
    const batsman2run = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(2)').text();
    const bowlerwikwt = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(5)').text();
    const bowlerover = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(2)').text();
  
    const lbb = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(8)').text();
  
    const bowlTeam = $('#top h3.ui-li-heading span.teamscores.ui-bowl-team-scores').text();
    const crr = $('#top .ui-match-scores-branding .crr').text();
    var commentry = $('#paginationList').find('div').find('div:nth-child(3)').text();
    const commentry2 = $('#paginationList').find('div').find('div:nth-child(5)').text();
  if  (!commentry ){
   commentry =commentry2;
  }
  
  var BatNameRun = batTeam.split(' ');
  var BowlNameRun = bowlTeam.split(' ');
  
  
  var BatNameRun1 = batTeam.split(' ');
  var BatName1 = BatNameRun1[0];
  var BatRun1 = batTeam.replace(BatName1, "").replace('-', "");
  
  var BatNameRun2 = bowlTeam.split(' ');
  var BatName2 = BatNameRun2[0];
  var BatRun2 = bowlTeam.replace(BatName2, "").replace('-', "");
  
  console.log(news);
   res.render('newindex', {
      matchList: match,
      newslist: news,
      Title:title,
      Status:status,
      BatName: BatName1,
      BatRun: BatRun1,
      BowlName: BatName2,
      BowlRun:BatRun2
          })
  }
  else{
    const bat1run =  $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-match-scores-branding').find('div.col-xs-9.col-lg-9.dis-inline').find('h3').find('span:nth-child(1)').text();
    const bat2run =  $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-match-scores-branding').find('div.col-xs-9.col-lg-9.dis-inline').find('h3').find('span:nth-child(2)').text();
    //#top > div > div:nth-child(11) > div.cb-list-item.miniscore-data.ui-match-scores-branding > div > div.col-xs-9.col-lg-9.dis-inline > h3
    var BatNameRun1 = bat1run.split(' ');
    var BatName1 = BatNameRun1[0];
    var BatRun1 = bat1run.replace(BatName1, "").replace('-', "");

    var BatNameRun2 = bat2run.split(' ');
    var BatName2 = BatNameRun2[0];
    var BatRun2 = bat2run.replace(BatName2, "").replace('-', "");

    console.log(BatName1,':',BatRun1);
    console.log(BatName2,':',BatRun2);
    console.log(news);
    res.render('newindex', {
      matchList: match,
      newslist: news,
      Title:title,
      Status:status,
      BatName: BatName1,
      BatRun: BatRun1,
      BowlName: BatName2,
      BowlRun:BatRun2
          })
  }


}).catch(function (error) {
    console.log('404');
  });


    
    })
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
 const protocol = req.protocol;
  const host = req.hostname;
  const port = process.env.PORT || 4000;

  let fullUrl = `https://${host}`

  if(!process.env.PORT){
    fullUrl = `${protocol}://${host}:${port}`
  }


console.log(req.body.id)  
Match.find({_id:req.body.id}, function(err, match) {
	console.log(match[0].name)  
        res.render('edit', {
           match: match[0],
           iourl:fullUrl
        })
    })
});


app.get('/match/:id', function(req, res) {
  const protocol = req.protocol;
  const host = req.hostname;
  const port = process.env.PORT || 4000;

  let fullUrl = `https://${host}`

  if(!process.env.PORT){
    fullUrl = `${protocol}://${host}:${port}`
  }

  //res.send("tagId is set to " + req.params.id);
Match.find({_id:req.params.id}, function(err, match) {
	console.log(match[0].name)  
        res.render('onematch', {
           match: match[0],
           iourl:fullUrl
        })
    })

});


app.get('/news/:id', function(req, res) {
News.find({_id:req.params.id}, function(err, news) {
	console.log(news[0].title)  
        res.render('news-single', {
           news: news[0]
        })
    })
});

app.get('/news/edit/:id', function(req, res) {
News.find({_id:req.params.id}, function(err, news) {
	console.log(news[0].title)  
        res.render('news-edit', {
           news: news[0]
        })
    })
});



app.post('/newsup', (req, res) => {

  News.findByIdAndUpdate(req.body.id,{
      title: req.body.title,
      thumb:req.body.img,
      content:req.body.content,
      author:req.body.author
  
  }, function(err, result){
  
          if(err){
              res.send(err)
          }
          else{
              res.redirect('/news');
              console.log(result);
          }
  
      })
  
  
  
  
  })


app.get('/news/delete/:id', function(req, res) {
  News.remove({_id:req.params.id}, function(err){
    if(err) throw err;})
    res.redirect('/news');
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
    
      var lbb = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(8)').text();
      if (!lbb){
        lbb = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(5)').text();
      }

      let lb = lbb.split(' ');
      lb = lb[lb.length - 1];

      var pship = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(2)').text();
      var lw = $('#top').find('div').find('div:nth-child(11)').find('div.cb-list-item.miniscore-data.ui-branding-style.ui-branding-style-partner').find('div').children().children().find('span:nth-child(5)').text();

      const batTeam = $('#top h3.ui-li-heading span.miniscore-teams.ui-bat-team-scores').text();
      const bowlTeam = $('#top h3.ui-li-heading span.teamscores.ui-bowl-team-scores').text();
      const crr = $('#top .ui-match-scores-branding .crr').text();
      var commentry = $('#paginationList').find('div').find('div:nth-child(3)').text();
      const commentry2 = $('#paginationList').find('div').find('div:nth-child(5)').text();
    if  (!commentry ){
     commentry =commentry2;
    }
    if(!commentry){
      commentry = $('#paginationList').find('div').find('div:nth-child(6)').text();
    }
    var BatNameRun = batTeam.split(' ');
    var BowlNameRun = bowlTeam.split(' ');
    
    var BatNameRun1 = batTeam.split(' ');
    var BatName1 = BatNameRun1[0];
    var BatRun1 = batTeam.replace(BatName1, "").replace('-', "");
  
    var BatNameRun2 = bowlTeam.split(' ');
    var BatName2 = BatNameRun2[0];
    var BatRun2 = bowlTeam.replace(BatName2, "").replace('-', "");

    const batsman1URL = $('#top table tr:nth-child(2)').first().first().find('td:nth-child(1)').find('a').attr('href');
    const batsman2URL = $('#top table tr:nth-child(3)').first().first().find('td:nth-child(1)').find('a').attr('href');
    const bowlerURL = $('#top').find('div:nth-child(11)').find('div:nth-child(3)').find('tr:nth-child(2)').find('td:nth-child(1)').find('a').attr('href');
    
  
  
    var batsman1img;
    var batsman2img;
    var bowlerimg;
    
  
  
  
    
   if(batTeam){
    
    axios.get('https://m.cricbuzz.com'+bowlerURL).then((response) => {
      // Load the web page source code into a cheerio instance
    
      
    
      const $ = cheerio.load(response.data); 
      const imgURL = $('#playerProfile').find('div.thumbnail').find('img').attr('src');
      bowlerimg = 'https:'+imgURL;
  
      //#playerProfile > div.list-group > div:nth-child(2) > div > div > div > div > img
    }).catch(function (error) {
    // handle error
    console.log('404');
  });
  
    axios.get('https://m.cricbuzz.com'+batsman1URL).then((response) => {
      // Load the web page source code into a cheerio instance
    
      
    
      const $ = cheerio.load(response.data); 
      const imgURL = $('#playerProfile').find('div.thumbnail').find('img').attr('src');
      batsman1img = 'https:'+imgURL;
  
      //#playerProfile > div.list-group > div:nth-child(2) > div > div > div > div > img
    }).catch(function (error) {
    // handle error
    console.log('404');
  });
  
  
    axios.get('https://m.cricbuzz.com'+batsman2URL).then((response) => {
      // Load the web page source code into a cheerio instance
    
      
    
      const $ = cheerio.load(response.data); 
      const imgURL = $('#playerProfile').find('div.thumbnail').find('img').attr('src');
      batsman2img = 'https:'+imgURL;

      io.emit('img',{batsman1img,batsman2img,bowlerimg});
      // console.log(batsman1img);
      // console.log(batsman2img);
      // console.log(bowlerimg);
      //#playerProfile > div.list-group > div:nth-child(2) > div > div > div > div > img
    }).catch(function (error) {
    // handle error
    console.log('404');
  });
    
    io.emit('match', {commentry,batTeam:{BatName1,BatRun1},bowlTeam:{BatName2,BatRun2},status,batsman1name,batsman1run,batsman2name,batsman2run,bowlername,bowlerover,bowlerwikwt,lbb,lb,pship,lw} );
   }
    
    
    }).catch(function (error) {
    // handle error
    console.log('404');
  });
    
        })

 },10000)




 socket.on('message', (masg) =>     {
  console.log(masg);
  io.emit('message',masg);
  var message1 = new Message({ name:masg.name,message:masg.body });
 
  // save model to database

  message1.save(function (err, masg) {
    if (err) return console.error(err);
    console.log(masg + " saved to link collection.");
  });
  
  Message.find({}, function(err, message) {
    Message.remove({_id:message[0]._id}, function(err){
      if(err) throw err;})  
  });
  
});



socket.on('update', (updt) =>     {
  console.log(updt);
  io.emit('update',updt);
});


});


server.listen(process.env.PORT || 4000, function() {
  console.log('server is running');
});
