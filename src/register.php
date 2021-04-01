<?php
    include 'config/config.php';
    include 'config/captcha.php';
    
    //Check is captcha is correct
    captcha("c-reg-err");

    $nickname = xssSave($_POST['reg-nickname']);
    $mail = xssSave($_POST['reg-mail']);
    $pass = xssSave($_POST['reg-password']);
    $pass = md5(xssSave($pass) . "GfHr14hj78");

    //Check if exists such user

    $user = $logIn->query("SELECT * FROM usersdata WHERE email = '$mail'");
    $user = $user->fetch_assoc();

    if(count($user) != 0) {
        setcookie("reg-error", "Mail jest zajęty!", time() + 7);
    }
    else {
        //Create new user and login him
        $logIn->query("INSERT INTO usersdata VALUES(null, '$nickname', '$mail', '$pass', '')");

        setcookie("user", $nickname, time() + 3600 * 24);
        setcookie("mail", $mail, time() + 3600 * 24);
        setcookie("pass", $pass, time() + 3600 * 24);
    }

    header("Location: /");
?>