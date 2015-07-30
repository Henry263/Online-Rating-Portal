/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {

});

$(function() {
    
    $('#signuppop').validate({
        rules: {
            username: {
                minlength: 6,
                required: true
            },
            firstname: {
                minlength: 6,
                required: true
            },
            lastname: {
                minlength: 6,
                required: true
            },
            password: {
                required: true,
                minlength: 6
            },
            reenterpassword: {
                required: true,
                minlength: 6,
                equalTo: "#pswd"
            },
            email: {
                required: true,
                email: true
            }
        },
        highlight: function(element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        unhighlight: function(element) {
            $(element).closest('.control-group').removeClass('error').removeClass('success');
        },
        success: function(element) {
            $(element)
                    .addClass('valid')
                    .closest('.control-group').removeClass('error').addClass('success');
        }
    });
    
    $(".myButton").click(function(e) {

        e.preventDefault();
        var uname = document.getElementById("usernames").value;
        var mail = document.getElementById("mailid").value;
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var pass = document.getElementById("pswd").value;
        var repass = document.getElementById("repassword").value;

        var e = document.getElementById("course-select");
        var semester = e.options[e.selectedIndex].text;

//        if (fname != "" && && uname != "" && mail != "" && lname != "" && pass != "" && repass != "")
        if (fname.length >= 6 && uname.length >= 6 && validateEmail(mail) && lname.length >= 6 && pass.length >= 6 && repass.length >= 6)
        {
            if (pass == repass)
            {
                var datastring = {fname: fname, lname: lname, uname: uname, reemail: mail, repass: repass, semester: semester};
                $.ajax({
                    url: "http://localhost:8888/phpfiles/userregistration.php",
                    type: "post",
                    data: datastring,
                    success: function(data) {
                        alert(data);
                    },
                    error: function() {
                        alert("Registration failed. Try again.");
                    }
                });
                $('#signuppop')[0].reset();
            }
            else
            {
                alert("Both paswords must match..!!");
            }
        }
        else
        {
            alert("You are missing a required field..!!");
        }
    });
});

function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function changetext() {
    alert("only accessible if you are choosing any professor from homepage");
}