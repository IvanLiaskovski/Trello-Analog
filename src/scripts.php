<?php
    echo "<script>";
    //If user is login we add flag variable to add functional for user
    if (isset($_COOKIE['user'])) {
        echo "let flag = true;";
    }
    else {
        echo "let flag = false;";
    }
    //If login is failed we add eror variable to show error for user
    if (isset($_COOKIE['log-error'])) {
        $txt = $_COOKIE['log-error'];
        echo "let error = '$txt';";
    }
    else { 
        echo "let error = false;";
    }
    //If mail is 
    if (isset($_COOKIE['reg-error'])) {
        $txt = $_COOKIE['reg-error'];
        echo "let regError = '$txt';";
    }
    else {
        echo "let regError = false;";
    }
    //Register captcha error 
    if (isset($_COOKIE['c-reg-err'])) {
        $txt = $_COOKIE['c-reg-err'];
        echo "let cRegError = '$txt';";
    }
    else {
        echo "let cRegError = false;";
    }
    //Login captcha error
    if (isset($_COOKIE['c-log-err'])) {
        $txt = $_COOKIE['c-log-err'];
        echo "let cLogError = '$txt';";
    }
    else {
        echo "let cLogError = false;";
    }
    echo "</script>"
?>