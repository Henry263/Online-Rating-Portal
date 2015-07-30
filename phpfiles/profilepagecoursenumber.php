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
$profid = $_GET['prof_id'];
//$cnumber = 'CS480';
//echo "from pfrofile page of coursenumber.";
$fetch = mysql_query("SELECT distinct(cs_number) cn FROM `course_master` WHERE prof_id = '".$profid."'"); 
//echo $fetch1 = mysql_query("SELECT distinct(cs_name) cn FROM `course_master` WHERE cs_number = 'CS480'"); 

//echo $fetch; ".$csname."

while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    $row_array['cnumber'] = $row['cn'];
    //$row_array['c_id'] = $row['ci'];


    array_push($return_arr,$row_array);
}
echo json_encode($return_arr); 



?>
