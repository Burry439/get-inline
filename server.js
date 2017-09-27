var express = require('express');
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var Student = require('./models/students.js')
var Teacher = require('./models/teachers.js')

mongoose.connect('mongodb://localhost/get-inlineDB', function(){
    console.log('DB is on!!!! XD ;)')
})


app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

io.on('connection', function(client){
    console.log('working')
    client.emit('messages', {hello : 'hello'});
})

server.listen(8000, function(){
    console.log('listening on port 8000!!!XD')
})