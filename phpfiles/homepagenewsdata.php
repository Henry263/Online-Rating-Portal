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
$fetch = mysql_query("SELECT ndetails nd FROM  `NewsMaster`  WHERE 1"); 

//echo $fetch; ".$csname."

while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    $row_array['news_details'] = $row['nd'];
   
    array_push($return_arr,$row_array);
}
echo json_encode($return_arr); 



?>
