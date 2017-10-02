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
var CurrentSe = require('./models/currentse.js');
// var mongoconnection =  'mongodb://<olinsoffer>:<tigerXX33>@ds157964.mlab.com:57964/get-inlinedb';
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/get-inlineDB', { useMongoClient: true,/* other options */ }, function () {
    console.log('DB is onnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn!!!! XD ;)');
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
                var brandonStudent = thissession[currentTeacher].student;
                // var brandonIsAvail = thissession[currentTeacher].avail;
                data = {
                    postToRemove: {
                        name: brandonStudent,
                    },
                    teacherName: currentTeacher,
                    // isAvail: brandonIsAvail
                };
                client.emit('addToTeacher', data);
                currentTeacher = "Hadas";
                var hadasStudent = thissession[currentTeacher].student;
                // var hadasIsAvail = thissession[currentTeacher].avail;
                data = {
                    postToRemove: {
                        name: hadasStudent,
                    },
                    teacherName: currentTeacher,
                    // isAvail: brandonIsAvail
                };
                client.emit('addToTeacher', data);
                currentTeacher = "Omer";
                var omerStudent = thissession[currentTeacher].student;
                // var omerIsAvail = thissession[currentTeacher].avail;
                data = {
                    postToRemove: {
                        name: omerStudent,
                    },
                    teacherName: currentTeacher,
                    // isAvail: brandonIsAvail
                };
                client.emit('addToTeacher', data);
            });
        });
        CurrentSe.find({}, function (err, session) {
            var data, data2;
            var thissession = session[0];
            if (!thissession.Brandon.avail) {
                data2 = {
                    postToRemove: {
                        name: ""
                    },
                    teacherName: 'Brandon'
                };
                data = {
                    typeClicked: 'play',
                    teacher: 'Brandon'
                };
                client.emit('addToTeacher', data2);
                client.broadcast.emit('addToTeacher', data2);
                client.emit('pause-play-render', data);
                client.broadcast.emit('pause-play-render', data);
            }
            else {
                data = {
                    typeClicked: 'pause',
                    teacher: 'Brandon'
                };
                client.emit('pause-play-render', data);
                client.broadcast.emit('pause-play-render', data);
            }
            if (!thissession.Omer.avail) {
                data2 = {
                    postToRemove: {
                        name: ""
                    },
                    teacherName: 'Omer'
                };
                data = {
                    typeClicked: 'play',
                    teacher: 'Omer'
                };
                client.emit('addToTeacher', data2);
                client.broadcast.emit('addToTeacher', data2);
                client.emit('pause-play-render', data);
                client.broadcast.emit('pause-play-render', data);
            }
            else {
                data = {
                    typeClicked: 'pause',
                    teacher: 'Omer'
                };
                client.emit('pause-play-render', data);
                client.broadcast.emit('pause-play-render', data);
            }
            if (!thissession.Hadas.avail) {
                data2 = {
                    postToRemove: {
                        name: ""
                    },
                    teacherName: 'Hadas'
                };
                data = {
                    typeClicked: 'play',
                    teacher: 'Hadas'
                };
                client.emit('addToTeacher', data2);
                client.broadcast.emit('addToTeacher', data2);
                client.emit('pause-play-render', data);
                client.broadcast.emit('pause-play-render', data);
            }
            else {
                data = {
                    typeClicked: 'pause',
                    teacher: 'Hadas'
                };
                client.emit('pause-play-render', data);
                client.broadcast.emit('pause-play-render', data);
            }
        });


        //////////////////////////////////////////////////////////////////////////////////////


        client.on("add-post", function (data) {
            var name = data.name;
            var text = data.text;

            var time = data.time;
            var post = new Post({ name: name, text: text, time: time });

            post.save();
            // client.emit('render-post', data);
            console.log(data);
            client.broadcast.emit('render-post', data);
        });
        client.on('next-btn', function (dataNext) {
            var teacherName = dataNext.teacherName;
            var isEmpty = dataNext.isEmpty;
            Post.find({}, function (err, posts) {
                if (err) { console.log(err); }
                if (isEmpty) {
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
                    CurrentSe.find({}, function (err, session) {
                        var thissession = session[0];
                        thissession[teacherName] = postToRemove.name;
                        thissession.save();
                    });
                    var data = {
                        postToRemove: postToRemove,
                        teacherName: teacherName
                    };
                    // console.log(JSON.stringify(data) + 'popopopopo');
                    client.emit('addToTeacher', data);
                    client.broadcast.emit('addToTeacher', data);
                    // console.log(posts);
                }
                else if (!isEmpty) {
                    CurrentSe.find({}, function (err, session) {
                        var thissession = session[0];
                        thissession[teacherName] = "";
                        thissession.save();
                    });
                    var data2 = {
                        postToRemove: {
                            name: ""
                        },
                        teacherName: teacherName
                    };
                    console.log(JSON.stringify(data2) + 'popopopopo');
                    client.emit('addToTeacher', data2);
                    client.broadcast.emit('addToTeacher', data2);
                }
            });
        });
        client.on('pause-play', function (data) {
            // var typeClicked= data.typeClicked;
            // var thisButton= data.thisButton;
            // var teacher= data.teacher;
            // data = {
            //     typeClicked: typeClicked,
            //     thisButton: JSON.parse(thisButton),
            //     teacher: teacher
            // };
            // console.log(data.thisButton);
            CurrentSe.find({}, function (err, session) {
                var thissession = session[0];
                if (data.typeClicked === "play") {
                    thissession[data.teacher] = "";
                    thissession[data.teacher].avail = false;
                    thissession.save();
                    var data2 = {
                        postToRemove: {
                            name: ""
                        },
                        teacherName: data.teacher
                    };
                    client.emit('addToTeacher', data2);
                    client.broadcast.emit('addToTeacher', data2);
                    client.emit('pause-play-render', data);
                    client.broadcast.emit('pause-play-render', data);
                } else if (data.typeClicked === "pause") {
                    thissession[data.teacher].avail = true;
                    thissession.save();
                    client.emit('pause-play-render', data);
                    client.broadcast.emit('pause-play-render', data);
                }
            });

        });
    });
});


function initsession() {
    var session = new CurrentSe({
        Brandon: null,
        Hadas: null,
        Omer: null,
        sessioninited: true
    });
    session.save();
    sessioninited = true;
}

CurrentSe.find({}, function (err, session) {
    var thissession = session[0];
    if (!thissession) {
        initsession();
        console.log('inited session 11111111111111111');
    }
});

server.listen(process.env.PORT || '8080', function () {
    console.log('listening on port 8000!!!XD');
});
