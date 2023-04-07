<?php
header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
session_start();
if (isset($_SESSION['curr_user']) && $_SESSION['loggedin']==true) {
    echo json_encode(array(
		"success" => true,
		"user" => htmlentities($_SESSION['curr_user'])
	));
	exit;
}
else {
    echo json_encode(array(
		"success" => false
	));
	exit;
}
?>