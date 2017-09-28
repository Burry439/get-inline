var socket = io();
// socket.on('connect', function (data) {
//     console.log(data + 'dffddf');
//     // socket.emit('my other event', { my: 'data' });
// });


var source = $('#post-template').html();
var template = Handlebars.compile(source);


$('#gil-btn').on('click', function () {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes()
    var studentName = $('.dropdown-toggle').text();
    var studentText = $('#comment').val();
    var data = {
        name: studentName,
        text: studentText,
        time : time.toString()
    };
    if (data.name == "SELECT YOUR NAME " || data.text == "") {
        alert('please fill out');
        return;
    }
    var newHTML = template(data);
    $('#_posts').append(newHTML);
    socket.emit('add-post', data);
    console.log(data.name);
});

$('.next-btn').on('click', function () {
    var teacherName = $(this).data('teacher');
    console.log(teacherName);
    socket.emit('next-btn', teacherName);
});

socket.on('render-after-next', function () {
    $('#_posts').empty();
});


socket.on('render-post', function (data) {
    var newHTML = template(data);
    $('#_posts').append(newHTML);
});

socket.on('render-posts-all', function (posts) {
    for (i = 0, l = posts.length; i < l; i++) {
        var newHTML = template(posts[i]);
        $('#_posts').append(newHTML);
    }
});

socket.on('addToTeacher', function (data) {
    // if(!data.postToRemove) {
    //     $(".text" + data.teacherName).empty();
    //     return;
    // }
    var studentToAdd = data.postToRemove.name;
    var teacherName = data.teacherName;
    console.log(teacherName + 'lllllllllllllllllllll');
    var teacherLaptop = $(".text" + data.teacherName);
    // var brandonLaptop = $('.textBrandon');
    // var hadasLaptop = $('.textHadas');
    // var omerLaptop = $('.textOmer');
    // switch (teacherName) {
    //     case 'Brandon':
    //         brandonLaptop.empty();
    //         brandonLaptop.append(studentToAdd);
    //         break;
    //     case 'Hadas':
    //         hadasLaptop.empty()
    //         hadasLaptop.append(studentToAdd);
    //         break;
    //     case 'Omer':
    //         omerLaptop.empty();
    //         omerLaptop.append(studentToAdd);
    //         break;
    // }
    teacherLaptop.empty();
    teacherLaptop.append(studentToAdd);
});