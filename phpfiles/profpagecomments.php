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

//$_GET['p_id']=4;
//$_GET['st_id']=4;

$profid = $_GET['prof_id'];
//$stID = $_GET['st_id'];
//$profid = 1;
//echo $profid;
//echo $stID;
//$cnumber = 'CS480';/*
//echo "from pfrofile page of prof. commenys";

$fetch = mysql_query("SELECT distinct st.st_username stu,cm.cmmnt_line cl,cm.cmnt_time ct FROM `Comment_master` cm inner join Student_master st on st.st_id = cm.st_id where cm.prof_id = '".$profid."'"); 
//$fetch = mysql_query("SELECT cm.cmmnt_line cl,cm.cmnt_time ct ,sm.st_username stu FROM `Comment_master` cm, Student_master sm WHERE sm.st_id = cm.st_id and cm.prof_id = '".$profid."'"); 
//echo $fetch1 = mysql_query("SELECT cm.cmmnt_line,cm.cmnt_time,sm.st_username FROM `Comment_master` cm, Student_master sm WHERE sm.st_id = cm.st_id and cm.st_id = 4 and cm.prof_id = 2"); 
//echo "after query";
//echo $fetch; ".$csname."

while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    $row_array['comment'] = $row['cl'];
    $row_array['time'] = $row['ct'];
    $row_array['user'] = $row['stu'];


    array_push($return_arr,$row_array);
}
echo json_encode($return_arr); 




?>
