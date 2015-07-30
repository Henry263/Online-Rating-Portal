/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function() {


    /************ code to get news data for slider**********************/
    $.getJSON('http://localhost:8888/phpfiles/homepagenewsdata.php', function(data) {
        $.each(data, function(i, f) {
            var newsData = "<li><h4 class='news_margin'>" + f.news_details + "</h4></li>";
            $(newsData).appendTo("#NewsSlider");
        });
        var change_img_time = 5000;
        var transition_speed = 500;

        var simple_slideshow = $("#NewsSlider"),
                listItems = simple_slideshow.children('li'),
                listLen = listItems.length,
                i = 0,
                changeList = function() {

                    listItems.eq(i).fadeOut(transition_speed, function() {
                        i += 1;
                        if (i === listLen) {
                            i = 0;
                        }
                        listItems.eq(i).fadeIn(transition_speed);
                    });

                };

        listItems.not(':first').hide();
        setInterval(changeList, change_img_time);
    });
    /**************end of code ***************************************/

    var people = [];
    //alert("hiii");
    //$.getJSON('http://localhost:8888/phpfiles/backup_homepageprofdata.php', function(data){
    $.getJSON('http://localhost:8888/phpfiles/backup_homepageprofdata.php', function(data) {

        $.each(data, function(i, f) {

            var temp_pid = f.profid;
            var tq = getratingdata(temp_pid);
            if (tq >= 3.5)
            {
                var pdata = "<div class='right_name_prof'><tr><td><A href='#' onclick='getProfileChart(" + f.profid + ")'>" + f.p_name + " </A> " + "<br>" + " <a href='mailto:" + f.email + "'>" + f.email + "</a><br>" + f.department + "</div>"
                        + "<div class='right_smily'><h2>" + tq + "/5 &nbsp <img src='images/smily1.png'/></h2></div>";
                var pimg = "<table class='left_prof_img1'><tr><td><img class='img-radius'"
                        + "src='" + "data:image/jpg;base64,"
                        + f.image + "'/></td></tr></table>";
                $(pdata).appendTo("#profile_prof");
                $(pimg).appendTo("#profile_prof");
            }
            else if (tq <= 3.5 && tq >= 2)
            {
                var pdata = "<div class='right_name_prof'><tr><td><A href='#' onclick='getProfileChart(" + f.profid + ")'>" + f.p_name + " </A> " + "<br>" + " <a href='mailto:" + f.email + "'>" + f.email + "</a><br>" + f.department + "</div>"
                        + "<div class='right_smily'><h2>" + tq + "/5 &nbsp <img src='images/smily2.png'/></h2></div>";
                var pimg = "<table class='left_prof_img1'><tr><td><img class='img-radius'"
                        + "src='" + "data:image/jpg;base64,"
                        + f.image + "'/></td></tr></table>";
                $(pdata).appendTo("#profile_prof");
                $(pimg).appendTo("#profile_prof");
            }
            else if (tq <= 2)
            {
                var pdata = "<div class='right_name_prof'><tr><td><A href='#' onclick='getProfileChart(" + f.profid + ")'>" + f.p_name + " </A> " + "<br>" + " <a href='mailto:" + f.email + "'>" + f.email + "</a><br>" + f.department + "</div>"
                        + "<div class='right_smily'><h2>" + tq + "/5 &nbsp <img src='images/smily3.png'/></h2></div>";
                var pimg = "<table class='left_prof_img1'><tr><td><img class='img-radius'"
                        + "src='" + "data:image/jpg;base64,"
                        + f.image + "'/></td></tr></table>";
                $(pdata).appendTo("#profile_prof");
                $(pimg).appendTo("#profile_prof");
            } else {
                var pdata = "<div class='right_name_prof'><tr><td><A href='#' onclick='getProfileChart(" + f.profid + ")'>" + f.p_name + " </A> " + "<br>" + " <a href='mailto:" + f.email + "'>" + f.email + "</a><br>" + f.department + "</div>"
                        + "<div class='right_smily'><h2>" + tq + "/5 &nbsp <img src='images/smily3.png'/></h2></div>";
                var pimg = "<table class='left_prof_img1'><tr><td><img class='img-radius'"
                        + "src='" + "data:image/jpg;base64,"
                        + f.image + "'/></td></tr></table>";
                $(pdata).appendTo("#profile_prof");
                $(pimg).appendTo("#profile_prof");
            }



        });
    });
});
/****** Code to get the over all value of professor rating********/
var tpid;
function getratingdata(tpid) {
    var overall_quality = 0;
    // alert("from rating function"+tpid);
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/phpfiles/getoverallrating.php",
        data: 'prof_id=' + tpid,
        success: function(data)
        {
            var tmp = data.substring(1, data.length - 1);
            //alert(tmp);
            var tmp2 = tmp.replace(/},{/g, '} DELIMIT {');
            var tmp3 = tmp2.split(" DELIMIT ");

            for (var i in tmp3) {
                var obj = jQuery.parseJSON(tmp3[i]);
                //r_knowledge":"40","r_teaching":"37","r_material":"29","r_recommend":"35"
                var total_students = obj.number_of_student;
                var rating_knowledge = obj.r_knowledge / total_students;
                var rating_teaching = obj.r_teaching / total_students;
                var rating_material = obj.r_material / total_students;
                var rating_recommend = obj.r_recommend / total_students;

                overall_quality = (rating_knowledge + rating_teaching + rating_material + rating_recommend) / 4;
                overall_quality = Math.round(overall_quality * 10) / 10;
                //alert("Overall Quality:"+overall_quality);               
            }
        },
        async: false
    });
    return overall_quality;
}

/****** end of code **************************************************/

var maxNumOfStars = 5;
var latest_scores = [];
var latest_semesters = [];
var total_samples = 0;
var course_num = 0;
//var prfidglobal = sessionStorage.getItem("profid");				
var downloaded_latest_scores = [];
var downloaded_latest_semesters = [];
var usernamedb = 0;
var studentID = 0;
var course_id = 0;
var tablecontents = "";
var professor_ID = "";
function  getchartdata(profid) {
    document.getElementById("professor_chart").innerHTML = "";
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/phpfiles/profilepagechart.php",
        data: 'prof_id=' + profid,
        success: function(data)
        {
            // alert("from json" + data.profname);
            var tmp = data.substring(1, data.length - 1);
            //alert(tmp);
            var tmp2 = tmp.replace(/},{/g, '} DELIMIT {');
            var tmp3 = tmp2.split(" DELIMIT ");
            for (var i in tmp3) {
                // alert(tmp3[i]);


                var obj = jQuery.parseJSON(tmp3[i]);
                //var profdata = "<div>"+obj.ratyear+"<br/>"+obj.teaching+"</div>";
                //alert(profdata);

                downloaded_latest_semesters.push(obj.ratyear);
                downloaded_latest_scores.push(obj.teaching);
                //
            }

            //	alert(downloaded_latest_scores);
            //	alert(downloaded_latest_semesters);

            latest_scores = downloaded_latest_scores;
            latest_semesters = downloaded_latest_semesters;
            // document.getElementById("professor_chart").style.bgcolor = "white"; 

            var imag1 = "<img "
                    + "src='" + "" + "images/st.gif" + "'/>";
            //document.getElementById("professor_chart").innerHTML = "";
            tablecontents = "";
            // var tablecontents = "j";
            tablecontents = "<table id=\"ratetableid\">";
            for (var row = 0; row < maxNumOfStars + 1/* add one for semester description */; row++)
            {
                tablecontents += "<tr>";
                for (var col = latest_scores.length - 1; col >= 0; col--)
                {
                    if (row < maxNumOfStars)
                    {
                        if ((maxNumOfStars - row) - 0.5 <= latest_scores[col])
                        {
                            // tablecontents += "<td>" + "*" + "</td>";
                            tablecontents += "<td>" + imag1 + "</td>";
                        }
                        else
                        {
                            tablecontents += "<td>" + " " + "</td>";
                        }
                    }
                    else
                    {
                        tablecontents += "<td>" + latest_semesters[col] + "</td>";
                    }
                }
                tablecontents += "</tr>";
            }
            tablecontents += "</table>";
            //tablecontents += profid;
            document.getElementById("professor_chart").innerHTML = tablecontents;
        }

    });
}
/* end of code - get the chart details */
function getprofiledata(profid) {
    /* Get the image */
    $.ajax({
        type: "GET",
        //contentType: 'application/json',
        //dataType: "json",
        url: "http://localhost:8888/phpfiles/profilepageprofdata.php",
        //url: "http://192.168.56.101/imagetest.php",
        // data: 'cs_name=' + $('#search').val(),
        data: 'prof_id=' + profid,
        success: function(data)
        {
            //alert(data);
            //	var profdata = "<div>"+val.profname +"<br/>"+ val.profdetails+"</div>";
            //	alert(profdata);
            // remove  [ ]
            var obj = jQuery.parseJSON(data.substring(1, data.length - 1));
            var profdata = "<div class='right_name_prof1'>" + obj.profname + "<br/><b>" + obj.profdepartment + "</b><br/>" + obj.profdetails + "<br/><br/><br/><br/></div>";
            var profimg = "<div class='left_prof_img'><img class='img-radius'"
                    + "src='" + "data:image/jpg;base64,"
                    + obj.profimage + "'/></div>";
// alert(profdata);
            //var b = eval(data)[0];
            //alert(obj.profdata);
            var profname = "<div> Professor Name : &nbsp" + obj.profname + "</div>";
            //alert(obj.profname);
            //$(profname).appendTo("#prof_n");
            $(profdata).appendTo("#prof_exp");
            $(profimg).appendTo("#prof_exp");
            $(profname).appendTo("#prof_name_st");
        }

    }); // Ajax Call

    /* end of code */
}
function getProfileChart(prfidglobal) {
//  $( "#prof_exp" ).remove();
    document.getElementById("professor_comments").innerHTML = "";
    document.getElementById("prof_name_st").innerHTML = "";
    document.getElementById("prof_exp").innerHTML = "";
    document.getElementById("professor_chart").innerHTML = "";
    // document.getElementById("professor_comments").innerHTML = "";
    //document.getElementById("professor_chart").innerHTML = "";
    professor_ID = prfidglobal;
    var profid = prfidglobal;
    getprofiledata(profid);
    getchartdata(profid);
    // $( "#professor_chart" ).remove();
    $("#home").hide();
    $("#profile").hide();
    $("#rating").show();
    $("#forum").hide();
    $("#Contact").hide();
    getcoursedata(profid);
    getcomments(profid);
}
/***********Getting course number on page load **************************/
function getcoursedata(profid) {
    var pid = profid;
    $("#givefeedback").click(function(e) {
        e.preventDefault();
        var $select = $('#course_combo');
        $select.html('');
        // alert("from button:" + pid);
        $.ajax({
            type: "GET",
            url: "http://localhost:8888/phpfiles/profilepagecoursenumber.php",
            data: 'prof_id=' + pid,
            success: function(data)
            {
                var tmp = data.substring(1, data.length - 1);
                //alert(tmp);
                var tmp2 = tmp.replace(/},{/g, '} DELIMIT {');
                //alert(tmp2);
                var tmp3 = tmp2.split(" DELIMIT ");
                //alert(tmp3);
                for (var i in tmp3) {
                    var obj = jQuery.parseJSON(tmp3[i]);
                    document.getElementById('course_combo').innerHTML += '<option value="' + obj.cnumber + '">' + obj.cnumber + '</option>';
                }
            }
        });
    });
}

/* Code getting course name for professor */
var coursecontent = "";
function set() {
    var firstDropVal = $('#course_combo').val();
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/phpfiles/profpagecoursename.php",
        data: 'c_number=' + firstDropVal,
        success: function(data)
        {
            //alert(data);
            var obj_cnumber = jQuery.parseJSON(data.substring(1, data.length - 1));
            var coursename_text = obj_cnumber.cname;
            //alert(coursename_text);
            var object = document.getElementById('course_textbox');
            object.value = coursename_text;
        }
    });
}
function setcoursename_post() {
     $("#ask_in_thread").show();
    var firstDropVal1 = $('#courses_post_window').val();
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/phpfiles/profpagecoursename.php",
        data: 'c_number=' + firstDropVal1,
        success: function(data)
        {
            //alert(data);
            var obj_cnumber = jQuery.parseJSON(data.substring(1, data.length - 1));
            var coursename_text = obj_cnumber.cname;
            //alert(coursename_text);
            var object = document.getElementById('course_textbox_post');
            object.value = coursename_text;
        }
    });
}


/* ending of Code - to laod the course name in test box */

/*********************************************/

/************Starting of code =- for getting comments*******************/
function getcomments(profid) {
// alert("Starting of code. For filling comment area");	
    var p_id = profid;
    //alert(p_id);

    $.ajax({
        url: "http://localhost:8888/phpfiles/profpagecomments.php",
        type: "get",
        data: 'prof_id=' + p_id,
        success: function(data) {
            //alert(data);
            //alert("from commetns area");
            var maindata = data.substring(1, data.length - 1);
            //alert(tmp);
            var seperator = maindata.replace(/},{/g, '} DELIMIT {');
            var finalop = seperator.split(" DELIMIT ");
            //alert(finalop);
            for (var i in finalop)
            {
                // alert(finalop[i]);
                var obj = jQuery.parseJSON(finalop[i]);
                var todo_str = "No Data Loaded";
                var comment_data =
                        "<div class='left_comments'>" +
                        obj.user + "</div><div class='right_comments'>@" + obj.time +
                        "</div><div><textarea rows=\"2\" cols=\"100\" readonly>" +
                        obj.comment +
                        "</textarea>" +
                        "</div><br>";
                $(comment_data).appendTo("#professor_comments");
            }
        },
        error: function() {
            alert("failure");
            //$(".content3").css("display", "none");
        }
    });
    /* ending  of code - To fill the comment area */

}
/************Ending of code =- for getting comments*******************/
/****** Starting of code - calling post comment function***********/
$(function() {
    $("#post_rating").click(function(e) {
        var p_id = professor_ID;
        postmycomment(p_id);
    });
});
/*********************end code******************/
/******************starting of code - posting comment to database******************************/

function postmycomment(p_id) {

    //alert(prfidglobal);
    //alert("Professoir ID from cliek:" + p_id);
    var pro_id = p_id;
    //alert(pro_id);
    // var stu_id = studentID;
    var stu_id = 3;
    //alert("Now Showing studnet ID");
    //alert(stu_id);

    //$("#result").html('');
    //var values = $("#form").serialize();
    var e = document.getElementById("semdetails");
    var semester = e.options[e.selectedIndex].text;
    var f = document.getElementById("course_combo");
    var course_id = f.options[f.selectedIndex].text;
    var course_name = document.getElementById("course_textbox").value;
    //alert(course_name);
    var g = document.getElementById("qu1");
    var q_01 = g.options[g.selectedIndex].value;
    //alert(q_01);
    var h = document.getElementById("qu2");
    var q_02 = h.options[h.selectedIndex].value;
    var k = document.getElementById("qu3");
    var q_03 = k.options[k.selectedIndex].value;
    var p = document.getElementById("qu4");
    var q_04 = p.options[p.selectedIndex].value;
    var comments_area = document.getElementById("carea").value;
    //alert(comments_area);

    var datastring = {semester: semester, course_id: course_id, course_name: course_name, q_01: q_01, q_02: q_02, q_03: q_03, q_04: q_04, comments_area: comments_area, pro_id: pro_id, stu_id: stu_id};
    //alert(datastring);
    if (semester != "" && course_id != "" && course_name != "" && q_01 != "" && q_02 != "" && q_03 != "" && q_04 != "" && comments_area != "")
    {
        /* to chec if any box is empty or not */
        $.ajax({
            url: "http://localhost:8888/phpfiles/postdata.php",
            type: "post",
            data: datastring,
            success: function(data) {
                alert(data);
                $("#afterpost").html('Submitted successfully');
            },
            error: function() {
                alert("failure");
                $("#afterpost").html('There is error while submit');
            }
        });
    }
    else
    {
        alert("You are missing any filed..!!");
    }
}



/****************Ending of code - posting comment to database*************************/