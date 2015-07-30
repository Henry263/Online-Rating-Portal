/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    backtocourse();
    
      $("#ask_in_thread").hide();
    /* $.getJSON('http://localhost:8888/phpfiles/get_courses.php', function(data) {
     $.each(data, function(i, f) {
     var tblRow = "<tr><td> <A href='#' onclick=\"getPosts('" + f.name + "')\">" + f.name + " </A></td></tr>";
     
     
     document.getElementById('courses_forum').innerHTML += '<option value="' + f.name + '">' + f.name + '</option>';
     document.getElementById('courses_post_window').innerHTML += '<option value="' + f.name + '">' + f.name + '</option>';
     
     $(tblRow).appendTo("#courses-div");
     });
     }); */
});

function callpost_window() {
    // alert("add post button clicked.");
    $("#home").hide();
    $("#profile").hide();
    $("#rating").hide();
    $("#forum").hide();
    $("#Contact").hide();
    $("#post_window").show();
}
function getcourse() {
    var firstDropVal2 = $('#courses_forum').val();
    $("#thread_data").hide();
    document.getElementById("thread-dec-div").innerHTML = "";
    document.getElementById("thread-history-div").innerHTML = "";
    getPosts(firstDropVal2);
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/phpfiles/profpagecoursename.php",
        data: 'c_number=' + firstDropVal2,
        success: function(data)
        {
            //alert(data);
            var obj_cnumber = jQuery.parseJSON(data.substring(1, data.length - 1));
            var coursename_text = obj_cnumber.cname;
            //alert(coursename_text);
            var object = document.getElementById('course_textbox_forum');
            object.value = coursename_text;
        }
    });
}
function getPosts(c) {

    document.getElementById("course-details1").innerHTML = "";
    var course = c;
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/phpfiles/get_posts.php",
        data: 'course=' + course,
        success: function(data) {
            var parsedData = JSON.parse(data);
            $.each(parsedData, function(i, f) {
               
                var tblRow = "<br><a class='thread_table' href=\"#\" onclick=\"viewComments(" + f.pid + ")\"><div class='thread_table tb-border'> Created By:" + f.fn + " " + f.ln + "  (Date Created:" + f.dt + ")" +
                        "<p class='thread-font'>Description:" + f.desc + "</p>" + "</div>";

                $(tblRow).appendTo("#course-details1");
            });
        },
        error: function() {
            alert("Something wrong. Please try again.");
        }
    });

    var endRow = "</table>";
    $(endRow).appendTo("#course-details-div");
}
function backtocourse() {
    document.getElementById("courses_forum").innerHTML = "";
    document.getElementById("courses_post_window").innerHTML = "";
    //alert("Back button clicked.");
    $.getJSON('http://localhost:8888/phpfiles/get_courses.php', function(data) {
        $.each(data, function(i, f) {
            var tblRow = "<tr><td> <A href='#' onclick=\"getPosts('" + f.name + "')\">" + f.name + " </A></td></tr>";
            document.getElementById('courses_forum').innerHTML += '<option value="' + f.name + '">' + f.name + '</option>';
            document.getElementById('courses_post_window').innerHTML += '<option value="' + f.name + '">' + f.name + '</option>';

            $(tblRow).appendTo("#courses-div");
        });
    });
}
function postmyreply() {
    
    var thread_reply = document.getElementById('thead_reply').value;
    if(thread_reply != "" || thread_reply != null)
    {
        // put the logic over here
        alert("From test area buttton..!!:"+thread_reply);
    }
    else{
        alert("text area value empty");
    }
}
function create_newthread() {
    
    var newthread = document.getElementById('Create_new_thread').value;
    if(newthread != "" || newthread != null)
    {
        // put the logic over here
        alert("From test area buttton..!!:"+newthread);
    }
    else{
        alert("text area value empty");
    }
}

function viewComments(pid) {
    $("#thread_data").show();
    document.getElementById("course-details1").innerHTML = "";
    document.getElementById("thread-dec-div").innerHTML = "";
    document.getElementById("thread-history-div").innerHTML = "";
    var postId = pid;
    
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/phpfiles/getPost.php",
        data: 'postId=' + postId,
        success: function(data) {
            var parsedData = JSON.parse(data);
            $.each(parsedData, function(i, f) {
                
                var tblRow = "<br><div class='thread__desc_table tb-border'> Created By:" + f.fn + " " + f.ln + "  (Date Created:" + f.dt + ")" +
                        "<p class='thread-font'>Description:" + f.desc + "</p>" + "</div>";

                $(tblRow).appendTo("#thread-dec-div");
            });
        },
        error: function() {
            alert("Something wrong. Please try again.");
        }
    });

    $.ajax({
        type: "GET",
        url: "http://localhost:8888/phpfiles/get_comments.php",
        data: 'postId=' + postId,
        success: function(data) {
            var parsedData = JSON.parse(data);
            $.each(parsedData, function(i, f) {
              
                var tblRow = "<br><div class='thread__desc_table tb-border'> Replied By:" + f.fn + " " + f.ln + "  (Date Replied:" + f.dateR + ")" +
                        "<p class='thread-font'>Comment:- " + f.cont + "</p>" + "</div>";


                $(tblRow).appendTo("#thread-history-div");
            });
        },
        error: function() {
            alert("Something wrong. Please try again.");
        }
    });

    var endRow = "<textarea name=\"content\" rows=\"6\" cols=\"35\"></textarea>" +
            "<td> <a href=\"#\" onclick=\"submitReply(" + postId + ")\">Reply</a></td>" + "</table>";

    $(endRow).appendTo("#comments-details-div");
}