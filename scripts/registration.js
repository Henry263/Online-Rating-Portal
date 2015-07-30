$(document).ready(function() {

    $('#signuppop').validate({
        rules: {
            name: {
                required: true,
            },
            username: {
                minlength: 6,
                required: true
            },
            pswd: {
                required: true,
                minlength: 6
            },
            confirm_password: {
                required: true,
                minlength: 6,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            },
            address: {
                minlength: 10,
                required: true
            }
//            agree: "required"

        },
        highlight: function(element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function(element) {
            element
                    .text('OK!').addClass('valid')
                    .closest('.control-group').removeClass('error').addClass('success');
        }
    });

}); // end document.ready