<?php
ini_set("session.cookie_httponly", 1);
    $mysqli = mysqli_connect('localhost', 'wustl_inst', 'wustl_pass', 'mod5');
    if($mysqli->connect_errno){
        printf("Connection Failed: %s\n", $mysqli->connect_error);
        exit;
    }
?>