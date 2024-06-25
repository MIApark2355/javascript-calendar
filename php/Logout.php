<?php
header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
	//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
	$json_str = file_get_contents('php://input');
	//This will store the data into an associative array
	$json_obj = json_decode($json_str, true);
  
  // logout
  session_start();
  if(!isset($_SESSION['curr_user'])){
    echo json_encode(array("success" => false));
    exit;
  }
  $_SESSION['loggedin']=false;
  $_SESSION['curr_user'] = null;
  $_SESSION['token'] = null;
  session_destroy();
  echo json_encode(array("success" => true));
  exit;
?>