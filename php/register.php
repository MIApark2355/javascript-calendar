<?php
ini_set("session.cookie_httponly", 1);
session_start();
// This is a *good* example of how you can implement password-based user authentication in your web application.
if($_SESSION['loggedin']){
    echo '<script>
	window.onload = function () { alert("Already Signed In"); } </script>';
	exit;
}

require 'database.php';
header("Content-Type: application/json");

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$username = htmlentities($json_obj['username']);
$password = htmlentities($json_obj['password']);
$confirm = htmlentities($json_obj['confirm']);
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

if($username==""){ //check if the user typed in something
	echo json_encode(array(
		"success" => false,
		"message" => "empty field"
	));
	exit;
} else if($password=="" || $confirm==""){ //check if the user typed in something
	echo json_encode(array(
		"success" => false,
		"message" => "empty field"
	));
	exit;
} else if($password!=$confirm){//check if the user typed different confirm password
	echo json_encode(array(
		"success" => false,
		"message" => "unmatching passwords"
	));
	exit;
}

//check if the user already exists
$stmt = $mysqli->prepare("SELECT COUNT(*) FROM users WHERE username=?");
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->bind_result($cnt);
$stmt->fetch();
$stmt->close();

if ($cnt>0) {
	echo json_encode(array(
		"success" => false,
		"message" => "Username taken. Please choose a new one."
	));
	exit;
}

$stmt->close();

// Inserting to table
$stmt = $mysqli->prepare("INSERT INTO users (username, hashed_password) VALUES (?, ?)");

if(!$stmt){
	echo json_encode(array(
		"success" => false,
		"message" => "prepare failed"
	));
	exit;
}

$hashed_password = password_hash($password, PASSWORD_BCRYPT);
$hashed_password = (string)$hashed_password ;

$stmt->bind_param('ss', $username, $hashed_password);

if(!$stmt->execute()){
	echo json_encode(array(
		"success" => false,
		"message" => "prepare failed"
	));
	exit;
}
$stmt->close();
echo json_encode(array(
	"success" => true
));
exit;
?>