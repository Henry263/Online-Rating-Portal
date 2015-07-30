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
//$csname = $_GET['cs_name'];
//echo "from pfrofile page of prof.";
//$fetch = mysql_query("SELECT * FROM course_master"); 
$fetch = mysql_query("SELECT prof_name pp,prof_email cno,prof_department cn, prof_image  pn,prof_id pi FROM `prof_master` WHERE 1"); 

//echo $fetch; ".$csname."

while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    $row_array['department'] = $row['cn'];
    $row_array['email'] = $row['cno'];
    $row_array['image'] = base64_encode($row['pn']);
    $row_array['p_name'] = $row['pp'];
    $row_array['profid'] = $row['pi'];


    array_push($return_arr,$row_array);
}
echo json_encode($return_arr); 



?>
