/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {

});

$(function() {
    $(".postButton").click(function(e) {
        e.preventDefault();
        var course = $("#crs option:selected").text();
        var description = $("textarea#description").val();
        var sessionVar = sessionStorage.getItem("username");
        
        alert(sessionVar);
        
        sessionStorage.setItem("username", "");
        
        $.ajax({
                type: "GET",
                url: "http://localhost:8888/phpfiles/savepost.php",
                data: 'course=' + course + "&description=" + description,
                success: function(data) {
                    alert("Question Posted.")
                },
                error: function() {
                    alert("Something wrong. Please try again.");
                }
            });
    });
});
    