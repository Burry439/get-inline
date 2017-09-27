
$('.student').on('click', function(){
    var studentName = $(this).closest('.student').text()
    var dropdown = $('.dropdown-toggle').text(studentName).append('  <i class="fa fa-caret-down" aria-hidden="true"></i>')    
});

// var newHTML = template({ name: name, problem: problem, time: time });
// $(".").append(newHTML);