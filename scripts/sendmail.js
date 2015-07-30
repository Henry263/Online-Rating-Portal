/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {

    // alert('hiii');

}); //document.ready


$(function() {
    $(".submit_button").click(function(e) {

        var email = document.getElementById("emailid").value;
        alert(email);
        alert("Submit button click")

        $.ajax({
            type: "GET",
            url: "http://localhost:8888/phpfiles/sendemail.php",
            data: 'emailid=' + email,
            success: function(data) {
                alert(data);
                // alert("You will get an email soon from admin.");
            },
            error: function() {
                alert("Something wrong. Please contact administrator.");
            }
        });

        document.getElementById("emailid").value = "";

    });

});