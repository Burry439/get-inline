var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Student = require('./models/students.js');
var Teacher = require('./models/teachers.js');
var Post = require('./models/post.js');
mongoose.connect('mongodb://localhost/get-inlineDB', {useMongoClient: true,/* other options */}, function() {
    console.log('DB is on!!!! XD ;)');
    io.on('connection', function (client) {
        Post.find({}, function(err, posts) {
            if(err) {console.log(err);}
            // console.log(posts);
            client.emit('render-posts-all', posts);
        });
        // client.on('event', function(data){});
        // client.on('disconnect', function(){});
        console.log('Hello');
        // client.broadcast.emit();
        client.on("add-post", function(data) {
            var name = data.name;
            var text = data.text;
            var post = new Post({name: name, text: text});
            post.save();
            // client.emit('render-post', data);
            console.log(data);
            client.broadcast.emit('render-post', data);
        });
    });
});


// io.on('connection', function (client) {
//     // client.on('event', function(data){});
//     // client.on('disconnect', function(){});
//     console.log('Hello');
//     // client.emit()
// });

server.listen(8000, function () {
    console.log('listening on port 8000!!!XD');
});