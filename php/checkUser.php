<?php
ini_set("session.cookie_httponly", 1);
session_start();

require 'database.php';
header("Content-Type: application/json");

$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$target_user = htmlentities($json_obj['target_user']);

if($target_user==""){ //check if the user typed in something
	echo json_encode(array(
		"success" => false,
		"message" => "empty field"
	));
	exit;
}else if($target_user==$_SESSION['curr_user']){
    echo json_encode(array(
		"success" => false,
		"message" => "same user"
	));
	exit;
}

$stmt = $mysqli->prepare("SELECT COUNT(*) FROM users WHERE username=?");
$stmt->bind_param('s', $target_user);
$stmt->execute();
$stmt->bind_result($cnt);
$stmt->fetch();
$stmt->close();

if ($cnt>0) {
	echo json_encode(array( // check to see if user exists
		"success" => true,
        
	));
	exit;
}else{
    echo json_encode(array(
		"success" => false,
        "message" => "user not exist"
	));
}
?>
