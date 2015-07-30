/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* starting of code - get the chart details */

var maxNumOfStars = 5;
var latest_scores = [];
var latest_semesters = [];
var total_samples = 0;
var course_num = 0;
var prfidglobal = 0;
var downloaded_latest_scores = [];
var downloaded_latest_semesters = [];
var usernamedb = 0;
var studentID = 0;
var course_id = 0;
function getProfileChart() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8888/phpfiles/profilepagechart.php",
        data: 'prof_id=' + 1,
        success: function(data)
        {

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

            var tablecontents = "";
            tablecontents = "<table>";
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
            document.getElementById("professor_chart").innerHTML = tablecontents;
        }
    });

    $("#home").hide();
    $("#profile").hide();
    $("#rating").show();
    $("#forum").hide();
    $("#Contact").hide();
}
/* end of code - get the chart details */

