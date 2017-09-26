var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Student = require('./models/students.js')
var Teacher = require('./models/teachers.js')

mongoose.connect('mongodb://localhost/get-inlineDB', function(){
    console.log('DB is on!!!! XD ;)')
})

var app = express();
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.listen(8000, function(){
    console.log('listening on port 8000!!!XD')
})