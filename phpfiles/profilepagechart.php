<?php
	

header('Access-Control-Allow-Origin: *');
header('constant-type: application/json');
//header('content-type: image/jpg');
$con = mysql_connect("127.0.0.1", "root", "");
//echo 'harshiltst2222'; 
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

$db_selected = mysql_select_db("eduportal",$con);
$profid = $_GET['prof_id'];
$return_arr = array();
//$csname = $_GET['cs_name'];
//echo "from pfrofile page of prof.";
$fetch = mysql_query("SELECT rm.rat_year ry, avg(rm.rat_teaching) avgtech,avg(rm.rat_coursematerial) avgcm FROM `rating_master` rm where rm.prof_id = '".$profid."' group by rm.rat_year"); 
//$fetch = mysql_query("SELECT rm.rat_year ry, avg(rm.rat_teaching) avgtech,avg(rm.rat_coursematerial) avgcm FROM `rating_master` rm where rm.prof_id = 1 group by rm.rat_year"); 
//"SELECT pm.prof_name,rm.rat_year, avg(rm.rat_teaching),avg(rm.rat_coursematerial) FROM `rating_master` rm, prof_master pm where pm.prof_id = 1 group by rm.rat_year"
//echo $fetch; ".$csname."

//echo 'hii';

while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    //$row_array['profname'] = $row['pn'];
    $row_array['ratyear'] = $row['ry'];
    $row_array['teaching'] = $row['avgtech'];
    $row_array['coursem'] = $row['avgcm'];
   // $row_array['profid'] = $row['pi'];


    array_push($return_arr,$row_array);
}

echo json_encode($return_arr); 

?>
