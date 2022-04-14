function anchorSubmit(calledForm) {
    document.getElementById(calledForm).submit();
}

$(document).ready(function () {
    $('form-signin').addClass("hidden");
});

$(function () {
    $(".btn").click(function () {
        if (document.getElementById('signupform').style.display == 'block') {
            document.getElementById('signupform').style.display = 'none';
            document.getElementById('signinform').style.display = 'block';
        } else {
            document.getElementById('signupform').style.display = 'block';
            document.getElementById('signinform').style.display = 'none';
        }
    });
});