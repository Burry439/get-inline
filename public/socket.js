
var socket = io()

io.connect('http://localhost:8000');
socket.on('messages', function(data){
    alert(data.hello)
})