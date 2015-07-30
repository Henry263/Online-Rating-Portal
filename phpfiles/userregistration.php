<?php

header('Access-Control-Allow-Origin: *');
header('constant-type: application/json');

$fn = $_POST['fname'];
$ln = $_POST['lname'];
$un = $_POST['uname'];
$mail = $_POST['reemail'];
$pass = $_POST['repass'];
$sem = $_POST['semester'];

//echo $fn;
//echo $ln;
//echo $un;
//echo $mail;
//echo $pass;
//echo $sem; 

$con = mysql_connect("127.0.0.1", "root", "");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

$db_selected = mysql_select_db("eduportal",$con);                                                                                                                                                                   
																																											
$insert_string = "INSERT INTO `Student_master` (`st_fname`, `st_lname`, `st_emailid`, `st_password`, `st_sem`, `st_username`) VALUES ('".$fn."','".$ln."','".$mail."', '".$pass."','".$sem."','".$un."')";

$query_status = mysql_query($insert_string);

if ($query_status) {
    echo "You registered successfully";
} else {
    echo "Registration failed.";
}
//echo "$query_status";

mysql_close($con);

?>