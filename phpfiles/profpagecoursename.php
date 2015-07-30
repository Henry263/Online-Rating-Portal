<?php
	

header('Access-Control-Allow-Origin: *');
header('constant-type: application/json');
$con = mysql_connect("127.0.0.1", "root", "");
//echo "harshiltst2222"."<br/>"; 
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

$db_selected = mysql_select_db("eduportal",$con);

$return_arr = array();
$cnumber = $_GET['c_number'];
//$cnumber = 'CS480';
//echo "from pfrofile page of prof.";
$fetch = mysql_query("SELECT distinct(cs_name) cn FROM `course_master` WHERE cs_number = '".$cnumber."'"); 
//echo $fetch1 = mysql_query("SELECT distinct(cs_name) cn FROM `course_master` WHERE cs_number = 'CS480'"); 

//echo $fetch; ".$csname."

while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    $row_array['cname'] = $row['cn'];
    //$row_array['c_id'] = $row['ci'];


    array_push($return_arr,$row_array);
}
echo json_encode($return_arr); 



?>
