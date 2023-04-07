<?php
session_start();
require 'database.php';

// Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
header("Content-Type: application/json");

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$username = $json_obj['username'];
$input_password = $json_obj['password'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']
if($username==""){ //check if the user typed in something
    echo json_encode(array(
        "success" => false,
        "message" => "empty field"
        ));
        exit;
} else if($input_password==""){ //check if the user typed in something
    echo json_encode(array(
        "success" => false,
        "message" => "empty field"
        ));
        exit;
}

$stmt = $mysqli->prepare("SELECT COUNT(*), username, hashed_password FROM users WHERE username=?");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "failed to prepare"
        ));
        exit;
}

//Bind the parameter
$stmt->bind_param('s', $username);
$stmt->execute();

$stmt->bind_result($cnt, $username, $hashed_password);
$stmt->fetch();


if($cnt == 1 && password_verify($input_password, $hashed_password)){
    // success
    
    $_SESSION['curr_user'] = $username;
    $_SESSION['loggedin'] = true;	
    // Create token
    $_SESSION['token'] = bin2hex(random_bytes(32));

    echo json_encode(array(
    "success" => true,
    "token" => $_SESSION['token'],
    "username" => $username,

    ));
    header("Refresh:0; url = http://ec2-3-138-112-230.us-east-2.compute.amazonaws.com/~MiaPark/Module5-group/main.html");
    exit;
}
else{
    //failed
    echo json_encode(array(
    "success" => false,
    "message" => "Incorrect Username or Password"
    ));
    header("Refresh:0; url = http://ec2-3-138-112-230.us-east-2.compute.amazonaws.com/~MiaPark/Module5-group/LoginPage.php");
    exit;
}
?>