<?php
    include "config/config.php";
    
    $mail = xssSave($_COOKIE['mail']);
    $pass = xssSave($_COOKIE['pass']);
    
    $data = $logIn->query("SELECT `json` FROM usersdata WHERE email = '$mail' AND pass = '$pass'");
    $data = $data->fetch_assoc();
    echo $data['json'];
?>