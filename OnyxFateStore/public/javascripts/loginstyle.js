function anchorSubmit(calledForm) {
    document.getElementById(calledForm).submit();
}

$(function () {
    $(".btn").click(function () {
        if (document.getElementById('signupform').style.display == 'block') {
            $("#collectEMAIL").fadeOut();
            $("#collectLOGIN").fadeout();
            $("#collectPASS").fadeOut();
            $("#collectCONFIRMATION").fadeout();
            $("#collectNAME").fadeout();
            $("#collectLASTNAME").fadeout();
            document.getElementById('signupform').style.display = 'none';
            document.getElementById('signinform').style.display = 'block';
        } else {
            document.getElementById('signupform').style.display = 'block';
            document.getElementById('signinform').style.display = 'none';
        }
    });
});