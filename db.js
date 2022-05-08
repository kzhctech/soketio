const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const { kStringMaxLength } = require('buffer');

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://kzhccric:2FQHi2IPGWdllW21@cluster0.v6byg.mongodb.net/kzhcCric?retryWrites=true&w=majority');

const moviesSchema = {
    title: String,
    genre: String,
    year: String
}

const movie = mongoose.model('movie', moviesSchema);


 movie.find({}, function(err, movie) {
	console.log(movei)

})