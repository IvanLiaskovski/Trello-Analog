<?php
    include "config/config.php";
    include 'config/captcha.php';

    //Check if captcha is correct
    captcha("c-log-err");

    $mail = xssSave($_POST['log-mail']);
    $pass = xssSave($_POST['log-password']);
    $pass = md5(xssSave($pass) . "GfHr14hj78");

    //Check if such user exist

    $user = $logIn->query("SELECT * FROM usersdata WHERE `email` = '$mail' AND `pass` = '$pass'");
    $user = $user->fetch_assoc();
    
    if(count($user) == 0) {
        setcookie("log-error", "Mail albo hasło jest błędny", time() + 7);
    }
    else {
        //Login user
        setcookie("user", $user['nickname'], time() + 3600 * 10);
        setcookie("mail",  $mail, time() + 3600 * 10);
        setcookie("pass", $pass, time() + 3600 * 10);
    }
    header("Location: /");
?>