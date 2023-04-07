<?php
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
require 'database.php';
ini_set("session.cookie_httponly", 1);
session_start();

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$username = $json_obj['target_user'];
$token = $json_obj['token'];
$title = $json_obj['title'];
$date = $json_obj['date'];
$month = $json_obj['month'];
$year = $json_obj['year'];
$time = $json_obj['time'];
$type = $json_obj['type'];

if($_SESSION['token'] !== $token){
    echo json_encode(array(
        "success" => false,
        "message" => "token failed"
    ));
    exit;
    //die("Request forgery detected");
}

$stmt = $mysqli->prepare("INSERT into events (title, username, date, month, year, time , type) VALUES (?, ?, ?, ? , ? ,?, ?)");

if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "prepare failed"
    ));
    exit;
}
 
$stmt->bind_param('ssiiiss', $title, $username, $date, $month, $year, $time, $type);
 
if(!$stmt->execute()){
    echo json_encode(array(
        "success" => false,
        "message" => "execute failed"
    ));
    exit;
}
$stmt->close();
echo json_encode(array("success" => true));


?>