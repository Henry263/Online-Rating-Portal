/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function() {

    $("#home").show();
    $("#profile").hide();
    $("#rating").hide();
    $("#forum").hide();
    $("#Contact").hide();
    //alertvhjbj ("test");
    $("#loginmodal").hide();
    $("#signupmodel").hide();
    $("#feedbackmodel").hide();
    $("#post_window").hide();
    $("#thread_data").hide();
    $(function() {
        $('#loginform').submit(function(e) {
            return false;
            $("#loginmodal").show();
            $("#signupmodel").hide();
            $("#feedbackmodel").hide();
        });

        $('#modaltrigger').leanModal({closeButton: ".hidemodal"});
    });
    $(function() {
        $('#signuppop').submit(function(e) {
            return false;
            $("#loginmodal").hide();
            $("#signupmodel").show();
            $("#feedbackmodel").hide();
        });

        $('#createaccount').leanModal({closeButton: ".hidemodal"});
    });
    $(function() {
        $('#signuppop').submit(function(e) {
            return false;
            $("#loginmodal").hide();
            $("#signupmodel").show();
            $("#feedbackmodel").hide();
        });

        $('#signuplink').leanModal({closeButton: ".hidemodal"});
    });
    $(function() {
        $('#feddbackform').submit(function(e) {
            return false;
            $("#loginmodal").hide();
            $("#signupmodel").hide();
            $("#feedbackmodel").show();
        });

        $('#givefeedback').leanModal({closeButton: ".hidemodal"});
    });
    $("#login_link").click(function() {
        $("#home").hide();
        $("#profile").hide();
        $("#rating").hide();
        $("#forum").hide();
        $("#Contact").show();
        $("#loginmodal").hide();
        $("#post_window").hide();

    });

    /*======================================*/
    // code for "back to top button"

    var offset = 220;
    var duration = 500;
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top').fadeIn(duration);
        } else {
            jQuery('.back-to-top').fadeOut(duration);
        }
    });

    jQuery('.back-to-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })

    /*=================================================================*/
//    var imgs = [
//        'images/slide11.jpg',
//        'images/04.jpg',
//        'images/slide_8.jpg',
//        'images/slide_9.jpg',
//        'images/slide55.jpg'];
//    var cnt = imgs.length;
//    /*
//     $("#signin").click(function() {
//     $("#loginpopup").dialog("open");
//     }); */
//    $(function() {
//        setInterval(Slider, 5000);
//    });
//
//    function Slider() {
//        $('#imageSlide').fadeOut("slow", function() {
//            $(this).attr('src', imgs[(imgs.length++) % cnt]).fadeIn("slow");
//        });
//    }
    $("#a").click(function() {
        $("#home").show();
        $("#profile").hide();
        $("#rating").hide();
        $("#forum").hide();
        $("#Contact").hide();
        $("#post_window").hide();
    });
    $("#b").click(function() {
        $("#home").hide();
        $("#profile").show();
        $("#rating").hide();
        $("#forum").hide();
        $("#Contact").hide();
        $("#post_window").hide();
    });
    $("#c").click(function() {
        $("#home").hide();
        $("#profile").hide();
        $("#rating").show();
        $("#forum").hide();
        $("#Contact").hide();
        $("#post_window").hide();
    });
    $("#d").click(function() {
        $("#home").hide();
        $("#profile").hide();
        $("#rating").hide();
        $("#forum").show();
        $("#Contact").hide();
        $("#post_window").hide();
    });
    $("#e").click(function() {
        $("#home").hide();
        $("#profile").hide();
        $("#rating").hide();
        $("#forum").hide();
        $("#Contact").show();
        $("#post_window").hide();
    });
});
