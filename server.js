var mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());
const ejs = require('ejs');
const { kStringMaxLength } = require('buffer'); 

 const bodyParser = require('body-parser');

    app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }));

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
    var BookSchema = mongoose.Schema({
      name: String,
      price: Number,
      quantity: Number
    });
 
    // compile schema to model
    var Book = mongoose.model('Book', BookSchema, 'bookstore');
 




app.get('/', (req, res) => {
    Book.find({}, function(err, book) {
        //console.log(movie)
        res.render('index', {
            bookList: book
        })
    })
})

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




app.listen(process.env.PORT || 4000, function() {
    console.log('server is running');
})




