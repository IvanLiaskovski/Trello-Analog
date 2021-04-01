<?php
    function captcha($err) {
        if (!isset($_POST['g-recaptcha-response'])) {
            setcookie($err, "Spróbój ponownie", time() + 7);
            header("Location: /");
            exit();
        }
        //Connect
        $url = "https://www.google.com/recaptcha/api/siteverify";
        $key = "6Lf21hoaAAAAALmC31f_sg6SZ6B-J6axv66Vp5_z";
        $query = $url."?secret=".$key."&response=".$_POST['g-recaptcha-response']."&remoteip=".$_SERVER['REMOTE_ADDR'];
        $data = json_decode(file_get_contents($query)); 
        //Check if captcha is correct
        if(!$data->success) {
            setcookie($err, "Spróbój ponownie", time() + 7);
            header("Location: /");
            exit();
        }
        setcookie($err, "", time() - 7);
    }
?>