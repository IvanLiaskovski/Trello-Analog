<?php
    include "config/config.php";

    if(!isset($_COOKIE['user'])) exit();
    
    //Data from ajax js and login user
    $data = $_POST['data'];
    $mail = xssSave($_COOKIE['mail']);
    $pass = xssSave($_COOKIE['pass']);

    $logIn->query("UPDATE usersdata SET `json` = '$data' WHERE `email` = '$mail' AND `pass` = '$pass'");
?>