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
$tag = $json_obj['tag']; // business or personal

// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)
$stmt = $mysqli->prepare("SELECT event_id, title, `date`, `month`, `year`,`time`, `type` FROM events WHERE username = ? AND type = ?");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
    ));
    exit;
}
$event_ids = array();
$event_titles = array();
$event_dates = array();
$event_months = array();
$event_years = array();
$event_times = array();
$event_types = array();

$stmt->bind_param('ss', $_SESSION['curr_user'], $tag);
$stmt->execute();
$stmt->bind_result($event_id, $event_title, $event_date, $event_month, $event_year, $event_time, $event_type);

while($stmt->fetch()) {
    $event_ids[] =htmlentities($event_id);
    $event_titles[] = htmlentities($event_title); 
    $event_dates[] = htmlentities($event_date);
    $event_months[] = htmlentities($event_month);
    $event_years[] = htmlentities($event_year);
    $event_times[] = htmlentities($event_time);
    $event_types[] = htmlentities($event_type);
}

$stmt->close();

echo json_encode(array(
    "success" => true,
    "event_ids" => $event_ids,
    "event_titles" => $event_titles,
    "event_dates" => $event_dates,
    "event_months" => $event_months,
    "event_years" => $event_years,
    "event_times" => $event_times,
    "event_types" => $event_types,
));
exit;

?>