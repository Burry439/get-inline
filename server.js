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
            CurrentSe.find({}, function (err, sessions) {
            //     for(var key in sessions[0]) {
                    // var data = {
                    //     postToRemove : {
                    //         name: sessions[0].key,
                    //     },
                    //     teacherName: key
                    // };
            //         console.log(data);
            //         client.emit('addToTeacher', data);
            //     }
            var currentTeacher, data;
            var thissession = sessions[0];
            currentTeacher = "Brandon";
            var brandonStudent = thissession[currentTeacher];
            data = {
                postToRemove : {
                    name: brandonStudent,
                },
                teacherName: currentTeacher
            };
            client.emit('addToTeacher', data);
            currentTeacher = "Hadas";
            var hadasStudent = thissession[currentTeacher];
            data = {
                postToRemove : {
                    name: hadasStudent,
                },
                teacherName: currentTeacher
            };
            client.emit('addToTeacher', data);
            currentTeacher = "Omer";
            var omerStudent = thissession[currentTeacher];
            data = {
                postToRemove : {
                    name: omerStudent,
                },
                teacherName: currentTeacher
            };
            client.emit('addToTeacher', data);
            });
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
                    CurrentSe.find({}, function(err, session) {
                        var thissession = session[0];
                        thissession[teacherName] = postToRemove.name;
                        thissession.save();
                    });
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

// var session = new CurrentSe({
//     Brandon: null,
//     Hadas: null,
//     Omer: null
// });

// session.save();

server.listen(8000, function () {
    console.log('listening on port 8000!!!XD');
});
