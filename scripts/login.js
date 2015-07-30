/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {

});

$(function() {
    $(".loginButton").click(function(e) {
        e.preventDefault();
        var uname = document.getElementById("username").value;
        var pass = document.getElementById("password").value;
//        alert("username: " + uname + "password:" + pass);

        if (uname != "" && pass != "") {
            $.ajax({
                type: "GET",
                url: "http://localhost:8888/phpfiles/userlogin.php",
                data: 'uname=' + uname + "&pass=" + pass,
                success: function(data) {
                    //alert(data);
                    //$.each(data, function(i, f) {  
		        //var tblRow = data[0].u;
                        var obj = jQuery.parseJSON(data.substring(1,data.length-1));
                        //alert(obj.u);
                        //alert(obj.s);
                        //alert(obj.p);
                        sessionStorage.setItem("username", obj.u);
                        
                        var username = sessionStorage.getItem("username");
                        //alert(test);
                        //sessionStorage.setItem("username", "");
		        //$(tblRow).appendTo("#profile"); 
		     //});
                },
                error: function() {
                    alert("Something wrong. Please try again.");
                }
            });
//            $.ajax({
//                type: "GET",
//                url: "http://localhost:8888/phpfiles/userlogin.php",
//                data: 'uname=' + uname + '&pswd=' + pass,
//                success: function() {
////                        alert('You logged in successfully');
//                },
//                error: function() {
//                    alert("Login failed. Try again.");
//                }
//            });
            $('#loginform')[0].reset();
        } else {
            alert("You are missing a required field..!!");
        }
    });
});
    