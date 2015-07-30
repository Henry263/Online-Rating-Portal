<?php 
header('Access-Control-Allow-Origin: *');
header('constant-type: application/json');
echo "hiii";

///$_GET['emailid'] = 'hrpatel.263@gmail.com';
$mail = $_GET['emailid'];
//$mail = 'harshilsks263@gmail.com';
//echo $mail;

$con = mysql_connect("127.0.0.1", "root", "");
//echo "harshiltst2222"."<br/>"; 
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

$db_selected = mysql_select_db("eduportal",$con);

$return_arr = array();

 
 $fetch = mysql_query("SELECT st_username su,st_emailid se,st_password sp FROM `Student_master`where st_emailid='".$mail."'");
 //$fetch = mysql_query("SELECT st_username su FROM Student_master WHERE st_username='$_GET['uname']' AND st_password='$_GET['pass']'");
//echo "after query fire";
while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    $row_array['u'] = $row['su'];
    $row_array['e'] = $row['se'];
     $row_array['p'] = $row['sp'];
    
     $uname = $row_array['u'];
      $email =  $row_array['e'];
     $password = $row_array['p']; 

    array_push($return_arr,$row_array);
}
//echo json_encode($return_arr); 
/*
echo $uname;
echo $email;
echo $password; */

if($email != "" || $email != null){

$emailTo = $row_array['e'];
$subject = "Your Password Reset Request";
$name = "Dear "+ $row_array['u']+"!!";
$emailFrom = "Eduportal Admin"; 
$message1 = "You are receiving this email because you forget your password. Here is the details of your account. ";
$message .= "\n";
$message2 .= "Your Username is : ".$uname. ".And Your password is : ".$password.". ";
$message .= "\n";
$message3 .= "Please contact us if you need more details or if you need any help.";

//echo $message;
// prepare email body text

$Body = "You have a message from: eduportal Admin";
$Body .= $name;
$Body .= "\n";
$Body .= "\n";
$Body .= $message1;
$Body .= "\n";
$Body .= $message2;
$Body .= "\n";
$Body .= $message3;

$sent = mail($emailTo, $subject, $Body); 
//echo "send prepared message";
/*$to = $row_array['e'];
$subject = 'This is subject';
$message = 'This is body of email';
$from = "From: FirstName LastName <SomeEmailAddress@Domain.com>";
$sent = mail($to,$subject,$message,$from);*/



//callback for jQuery AJAX

if($sent){

	$finalmessage = "Your email sent to ".$emailTo. ". Please check your email.";
  echo $finalmessage;
}
else{}
}
else
{
	echo 'Email ID not found';
}
//print_r($_GET); 
die(); 

?>