$(document).ready(function() {
    $('.signupBtn').click(() => {
        $('#signupForm').css({
            'display': 'block'
        });
        $('#loginForm').css({
            'display': 'none'
        });
        $(".signupBtn").addClass("active");
        $(".loginBtn").removeClass("active");
    }); 
    $('.loginBtn').click(() => {
        $('#signupForm').css({
            'display': 'none'
        });
        $('#loginForm').css({
            'display': 'block'
        });
        $(".loginBtn").addClass("active");
        $(".signupBtn").removeClass("active");
    }); 
});
