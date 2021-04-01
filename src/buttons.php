<?php
    //If user is login we show logout and save buttons
    if (isset($_COOKIE['user'])) {
        echo "<a href='log-out.php'><button>Wyloguj</button></a>
        <button id='save'>Zapisz</button>
        <p class='user'>". $_COOKIE['user'] ."</p>";
    }
    else {
        echo "<button id='register'>Rejestruj</button>
        <button id='log-in'>Zaloguj</button>";
    }
?>