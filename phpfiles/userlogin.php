<?php

header('Access-Control-Allow-Origin: *');
header('constant-type: application/json');

$return_arr = array();

$username = $_GET['uname'];
$pass = $_GET['pass'];

//echo "$username";
//echo "$pass";

$con = mysql_connect("127.0.0.1", "root", "");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

$db_selected = mysql_select_db("eduportal",$con);
 
 $fetch = mysql_query("SELECT st_username su,st_password pt,st_id sid FROM Student_master WHERE st_username='".$username."' and st_password='".$pass."'");// AND (st_password='".$_GET['pass']."')");// AND st_password='$_GET['pass']'");

while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    $row_array['u'] = $row['su'];
    $row_array['p'] = $row['pt'];
     $row_array['s'] = $row['sid'];
     
     $user_id =  $row_array['u'];

    array_push($return_arr,$row_array);
}

if($user_id != "" || $user_id != null) {
    echo json_encode($return_arr); 
    
} else {
    echo "Login failed...";
}

?>