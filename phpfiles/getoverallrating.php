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

//$fetch = mysql_query("SELECT distinct st.st_username stu,cm.cmmnt_line cl,cm.cmnt_time ct FROM `Comment_master` cm inner join Student_master st on st.st_id = cm.st_id where cm.prof_id = '".$profid."'"); 
$fetch = mysql_query("SELECT count(*) total_st,sum(rat_knowledge) t_r_k, sum(rat_teaching) t_r_t, sum(rat_coursematerial) t_r_c, sum(rat_recommend) t_r_r FROM `rating_master` where prof_id = '".$profid."'"); 

//$fetch = mysql_query("SELECT cm.cmmnt_line cl,cm.cmnt_time ct ,sm.st_username stu FROM `Comment_master` cm, Student_master sm WHERE sm.st_id = cm.st_id and cm.prof_id = '".$profid."'"); 
//echo $fetch1 = mysql_query("SELECT cm.cmmnt_line,cm.cmnt_time,sm.st_username FROM `Comment_master` cm, Student_master sm WHERE sm.st_id = cm.st_id and cm.st_id = 4 and cm.prof_id = 2"); 
//echo "after query";
//echo $fetch; ".$csname."

while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    $row_array['number_of_student'] = $row['total_st'];
    $row_array['r_knowledge'] = $row['t_r_k'];
    $row_array['r_teaching'] = $row['t_r_t'];
    $row_array['r_material'] = $row['t_r_c'];
    $row_array['r_recommend'] = $row['t_r_r'];

    array_push($return_arr,$row_array);
}
echo json_encode($return_arr); 




?>
