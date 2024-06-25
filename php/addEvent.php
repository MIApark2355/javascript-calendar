<?php
	//this adds events to the database
	ini_set("session.cookie_httponly", 1);
	session_start();
    require 'database.php';
    header("Content-Type: application/json");

	//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
	$json_str = file_get_contents('php://input');
	//This will store the data into an associative array
	$json_obj = json_decode($json_str, true);

	//Variables can be accessed as such:
	$title = $json_obj['title'];
	$username= (string)$_SESSION['curr_user'];
	$date = $json_obj['date'];
	$month = $json_obj['month'];
	$year = $json_obj['year'];
	$time = $json_obj['time'];
	$type = $json_obj['type'];
	$token = $json_obj['token'];


	if($_SESSION['token'] !== $token){
		echo json_encode(array(
			"success" => false,
			"message" => "token failed"
		));
		exit;
		//die("Request forgery detected");
		
	}
	
	
	//insert comment into comments table
	$stmt = $mysqli->prepare("INSERT into events (title, username, date, month, year, time , type) values (?, ?, ?, ? , ? ,?, ?)");
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