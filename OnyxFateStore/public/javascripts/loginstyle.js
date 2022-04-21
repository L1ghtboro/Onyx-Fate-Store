$(document).ready(function () {
    console.log('Chilling up ma dude');
});

function anchorSubmit(calledForm) {
    document.getElementById(calledForm).submit();
}

$(function () {
    $(".goToSignUpAnim").click(function () {
        $(".emailSignUp").fadeOut(600);
        if ($('.emailSignUp').is(':visible')) {
            $(".loginSignUp").fadeOut(900);
            if ($('.loginSignUp').is(':visible')) {
                $(".passSignUp").fadeOut(1200);
                if ($('.passSignUp').is(':visible')) {
                    $(".confirmSignUp").fadeOut(1500);
                    if ($('.confirmSignUp').is(':visible')) {
                        $(".nameSignUp").fadeOut(1800);
                        if ($('.nameSignUp').is(':visible')) {
                            $(".lastnameSignUp").fadeOut(2100);
                            if ($('.nameSignUp').is(':visible')) {
                                $('#signupform').fadeOut(2400);
                                if ($('.nameSignUp').is(':visible')) {
                                    setTimeout(function () {
                                        $('.emailSignIn').fadeIn(2400);
                                        $('.passSignIn').fadeIn(2700);
                                        $('#signinform').fadeIn(3000);
                                    }, 2400)
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    $(".goToSignInAnim").click(function () {
        $('.emailSignIn').fadeOut(600);
        if ($('.emailSignIn').is(':visible')) {
            $(".passSignIn").fadeOut(900);
            if ($('.passSignIn').is(':visible')) {
                $("#signinform").fadeOut(1200);
                if ($('#signinform').is(':visible')) {
                    setTimeout(function () {
                        $('.emailSignUp').fadeIn(1200);
                        $('.loginSignUp').fadeIn(1500);
                        $('.passSignUp').fadeIn(1800);
                        $('.confirmSignUp').fadeIn(2100);
                        $('.nameSignUp').fadeIn(240);
                        $('.lastnameSignUp').fadeIn(2700);
                        $('#signupform').fadeIn(3000);
                    }, 1200)
                }
            }
        }
    });
});