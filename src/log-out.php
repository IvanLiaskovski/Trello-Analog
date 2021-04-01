<?php
    if(isset($_COOKIE['user'])) {
        setcookie("user", "", time() - 3600 * 24);
        setcookie("mail", "", time() - 3600 * 24);
        setcookie("pass", "", time() - 3600 * 24);
    }
    
    header("Location: /");
?>