var express = require('express');
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Student = require('./models/students.js');
var Teacher = require('./models/teachers.js');
var Post = require('./models/post.js');
var CurrentSe = require('./models/currentse.js')
    ;
mongoose.connect('mongodb://localhost/get-inlineDB', { useMongoClient: true,/* other options */ }, function () {
    console.log('DB is on!!!! XD ;)');
    io.on('connection', function (client) {
        Post.find({}, function (err, posts) {
            if (err) { console.log(err); }
            // console.log(posts);
            client.emit('render-posts-all', posts);
            // CurrentSe.find({}, function (err, sessions) {
            //     sessions[0].
            // })
            // client.emit('addToTeacher', session);
            // client.broadcast.emit('addToTeacher', session);
        });
        // client.on('event', function(data){});
        // client.on('disconnect', function(){});
        console.log('Hello');
        // client.broadcast.emit();
        client.on("add-post", function (data) {
            var name = data.name;
            var text = data.text;

            var time = data.time;
            var post = new Post({name: name, text: text, time : time});

            post.save();
            // client.emit('render-post', data);
            console.log(data);
            client.broadcast.emit('render-post', data);
        });
        client.on('next-btn', function (teacherName) {
            Post.find({}, function (err, posts) {
                if (err) { console.log(err); }
                if (posts.length) {
                    var postToRemove = posts[0];
                    // console.log(postToRemove);
                    // var tempPostToRemove = postToRemove 
                    postToRemove.remove(function () {
                        Post.find({}, function (err, posts) {
                            if (err) { console.log(err); }
                            client.broadcast.emit('render-after-next');
                            client.emit('render-after-next');
                            client.broadcast.emit('render-posts-all', posts);
                            client.emit('render-posts-all', posts);
                        });
                    });
                    // var session = new CurrentSe(
                    //     {
                    //         studentName: postToRemove,
                    //         teacherName: teacherName
                    //     });
                    var data = {
                        postToRemove: postToRemove,
                        teacherName: teacherName
                    };
                    console.log(JSON.stringify(data) + 'popopopopo');
                    client.emit('addToTeacher', data);
                    client.broadcast.emit('addToTeacher', data);
                    // console.log(posts);
                }
                // else {
                //     var teacher = {
                //         postToRemove: null,
                //         teacherName: teacherName
                //     };
                //     client.emit(('addToTeacher', teacher));
                // }
            });
        });
    });
});

server.listen(8000, function () {
    console.log('listening on port 8000!!!XD');
});
