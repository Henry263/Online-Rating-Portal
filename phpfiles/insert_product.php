<?php
header('Access-Control-Allow-Origin: *');
header('constant-type: application/json');
$con = mysql_connect("127.0.0.1", "root", "");

if (!$con) {
    die('Could not connect: ' . mysql_error());
}

$db_selected = mysql_select_db("eduportal", $con);

// Image submitted by form. Open it for reading (mode "r")


$image = addslashes(file_get_contents($_FILES['image']['tmp_name'])); //SQL Injection defence!
$image_name = addslashes($_FILES['image']['name']);
$sql = "INSERT INTO `imagedata` (`id`, `image`, `image_name`) VALUES ('1', '{$image}', '{$image_name}')";
echo 'succfully uploaded';
if (!mysql_query($sql)) { // Error handling
    echo "Something went wrong! :("; 
}


?>;


