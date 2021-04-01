<?php
$settings = array(
    "server" => "localhost",
    "user" => "mysql",
    "pass" => "mysql",
    "database" => "trello"
);

$logIn = new mysqli($settings['server'], $settings['user'], $settings['pass'], $settings['database']);
if ($logIn->connect_error) {
    echo "Sorry but connect is failed: " . $config->connect_error;
    exit();
}

function xssSave($var) {
        $var = strip_tags($var);
        $var = htmlentities($var, ENT_QUOTES, "UTF-8");
        $var = htmlspecialchars($var, ENT_QUOTES);
        return $var;
}
?>