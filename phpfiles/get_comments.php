<?php

header('Access-Control-Allow-Origin: *');
header('constant-type: application/json');
$con = mysql_connect("127.0.0.1", "root", "");

if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

$db_selected = mysql_select_db("eduportal", $con);

$return_arr = array();

$postId = $_GET['postId'];

$query = "SELECT r.*,u.*,p.* FROM replies_master r JOIN `Student_master` u ON r.st_id=u.st_id JOIN posts_master p ON p.postID=r.postID WHERE r.postID = \"$postId\"";

$fetch = mysql_query($query);

while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    
    $row_array['pid'] = $row['postID'];
    $row_array['cont'] = $row['content'];
    $row_array['dateR'] = $row['dateReplied'];
    $row_array['fn'] = $row['st_fname'];
    $row_array['ln'] = $row['st_lname'];
    
    $row_array['desc'] = $row['description'];
    $row_array['dt'] = $row['datePosted'];

    array_push($return_arr, $row_array);
}


echo json_encode($return_arr);

?>
