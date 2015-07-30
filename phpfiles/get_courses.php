<?php
	

header('Access-Control-Allow-Origin: *');
header('constant-type: application/json');
$con = mysql_connect("127.0.0.1", "root", "");

if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

$db_selected = mysql_select_db("eduportal",$con);

$return_arr = array();

//$fetch = mysql_query("SELECT * FROM course_master"); 
$fetch = mysql_query("SELECT DISTINCT(cs_number) cn FROM `course_master`"); 

while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    $row_array['name'] = $row['cn'];

    array_push($return_arr,$row_array);
}
echo json_encode($return_arr); 



?>
