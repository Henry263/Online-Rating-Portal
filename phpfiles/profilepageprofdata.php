<?php
	

header('Access-Control-Allow-Origin: *');
header('constant-type: application/json');
//header('content-type: image/jpg');
$con = mysql_connect("127.0.0.1", "root", "");
//echo "harshiltst2222"."<br/>"; 
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

$db_selected = mysql_select_db("eduportal",$con);
$profid = $_GET['prof_id'];
$return_arr = array();
//$csname = $_GET['cs_name'];
//echo "from pfrofile page of prof.";
//$fetch = mysql_query("SELECT * FROM course_master"); 
$fetch = mysql_query("SELECT prof_name pn,prof_details pd,prof_image pi, prof_department pdm FROM `prof_master` WHERE prof_id = '".$profid."'"); 
//echo "after fetch" + $fetch;
//echo $fetch; ".$csname.";


while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    $row_array['profname'] = $row['pn'];
    $row_array['profdetails'] = $row['pd'];
    //$row_array['profimage'] = $row['pi'];
    $row_array['profimage'] = base64_encode($row['pi']);
    $row_array['profdepartment'] = $row['pdm'];
   // $row_array['profid'] = $row['pi'];


    array_push($return_arr,$row_array);
}
/*while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    $row_array['cs_name'] = $row['cs_name'];
    $row_array['cs_id'] = $row['cs_id'];
    
    $row_array['cs_number'] = $row['cs_number'];


    array_push($return_arr,$row_array);
} */
echo json_encode($return_arr);
?>
