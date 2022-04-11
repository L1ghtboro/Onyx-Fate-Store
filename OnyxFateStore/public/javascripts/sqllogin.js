function collectData(calledFrom) {
    let User = [document.getElementById('collectLOGIN').value,
                document.getElementById('collectEMAIL').value,
                document.getElementById('collectPASS').value,
                document.getElementById('collectNAME').value,
                document.getElementById('collectLASTNAME').value];
 
}

function anchorSubmit(calledForm) {
    document.getElementById(calledForm).submit();
}

//$(function () {
//    $(".btn").click(function () {
//        $(".form-signin-active").toggleClass("form-signin-inactive");
//        $(".form-signup-inactive").toggleClass("form-signup-active");
//    });
//});

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