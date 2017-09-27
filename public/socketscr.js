var socket = io();
socket.on('connect', function (data) {
    console.log(data+'dffddf');
    // socket.emit('my other event', { my: 'data' });
});
var source = $('#post-template').html();
var template = Handlebars.compile(source);


$('#gil-btn').on('click', function () {
    var studentName = $('.dropdown-toggle').text();
    var studentText = $('#comment').val();
    var data = {
        name: studentName,
        text: studentText
    };
    if(data.name == "SELECT YOUR NAME "  || data.text == ""){
        alert('please fill out');
        return;
    }
    var newHTML = template(data);
    $('#_posts').append(newHTML);
    socket.emit('add-post', data);
    console.log(data.name)
});

socket.on('render-post', function (data) {
    var newHTML = template(data);
    $('#_posts').append(newHTML);
});

socket.on('render-posts-all', function(posts) {
    for(i = 0, l=posts.length; i<l; i++) {
        var newHTML = template(posts[i]);
        $('#_posts').append(newHTML);
    } 
});