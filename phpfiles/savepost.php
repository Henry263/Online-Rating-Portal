

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
<?php

header('Access-Control-Allow-Origin: *');
header('constant-type: application/json');

$course = $_GET['course'];
$description = $_GET['description'];
$stid = 1;

$con = mysql_connect("127.0.0.1", "root", "");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

$db_selected = mysql_select_db("eduportal",$con);                                                                                                                                                                   
																																											
$insert_string = "INSERT INTO `posts_master` (`st_id`, `course`, `description`) VALUES ('".$stid."','".$course."','".$description."')";

$query_status = mysql_query($insert_string);
alert($query_status);
if ($query_status) {
    alert("Question Posted.");
} else {
    echo "Issue";
}
//echo "$query_status";

mysql_close($con);

?>
