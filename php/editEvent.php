<?php
require 'database.php';
ini_set("session.cookie_httponly", 1);
session_start();

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$event_id = htmlentities($json_obj['event_id']);
$title = htmlentities($json_obj['title']);
$time = htmlentities($json_obj['time']);
$type =  htmlentities($json_obj['type']);
$token = htmlentities($json_obj['token']);

if($_SESSION['token'] !== $token) {
	echo json_encode(array(
		"success" => false,
		"message" => "token failed"
	));
	die("Request forgery detected");
}

// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)

$stmt = $mysqli->prepare("UPDATE events SET title = ?, time = ?, type = ? WHERE event_id = ?");

if(!$stmt) {
    echo json_encode(array(
		"success" => false,
		"message" => "prepare failed"
	));
	exit;
}

$stmt->bind_param('sssi', $title, $time, $type, $event_id);

if(!$stmt->execute()){
	echo json_encode(array(
		"success" => false,
		"message" => "execute failed"
	));
	exit;
}

$stmt->close();

echo json_encode(array(
    "success" => true
));
exit;

?>