<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Trello</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto|
    Tomorrow&display=swap">
    <!--Scripts-->
    <?php include "scripts.php";?>
</head>

<body>
    <!--PoP uP-->
    <div class="data-save">Dane zostały zapisane!</div>
    <div class="data-save-error">Błąd zapisu danych!</div>
    <!--Fixed Elements-->
    <div class="log-in-system">
        <?php include "buttons.php"; ?>
    </div>
    <div class="basket">
        <img src="image/basket.png">
    </div>
    <!--Main-->
    <h1>Trello Analog</h1>
    <div class="main-container">
        <div class="create-table">
            <div class="open-creator">Utwórz nową tabele...</div>
            <div class="creator-inner">
                <p>Jak nazwiemy tabele?</p>
                <input type="text" name="task-title" id="task-title">
                <span>Zapomniałeś nazwę</span>
                <div>
                    <button id="cancel">Zamknij</button>
                    <button id="add-task">Utwóż</button>
                </div>
            </div>
        </div>
    </div>
    <!--Modals-->
    <div class="register-modal  modal">
        <div class="modal-container">
            <h3>Rejestracja</h3>
            <form id="register-form" action="register.php" method="POST">
                <label for="#reg-nickname">
                    <input type="text" name="reg-nickname" id="reg-nickname" placeholder="Login">
                    <span class="reg-error"></span>
                </label>
                <label for="#reg-mail">
                    <input type="email" name="reg-mail" id="reg-mail" placeholder="Mail">
                    <span class="reg-error"></span>
                </label>
                <label for="#reg-password">
                    <input type="password" name="reg-password" id="reg-password" placeholder="Hasło">
                    <span class="reg-error"></span>
                </label>
                <label for="#reg-repeat">
                    <input type="password" name="reg-repeat" id="reg-repeat" placeholder="Powtóż hasło">
                    <span class="reg-error"></span>
                </label>
                <div style="transform: scale(.86); transform-origin: 0;" class="g-recaptcha"
                    data-sitekey="6Lf21hoaAAAAAEj2VYpWpvtDYWD64JsZH4yt1jak"></div>
                <span class="reg-error" id="c-reg-error"></span>
                <button class="submit" type="submit">Wyślij</button>
            </form>
        </div>
    </div>
    <div class="login-modal modal">
        <div class="modal-container">
            <h3>Logowanie</h3>
            <form id="login-form" action="login.php" method="POST">
                <input type="email" name="log-mail" id="log-mail" placeholder="Email">
                <input type="password" name="log-password" id="log-password" placeholder="Hasło">
                <span class="log-error"></span>
                <div style="transform: scale(.86); transform-origin: 0;" class="g-recaptcha"
                    data-sitekey="6Lf21hoaAAAAAEj2VYpWpvtDYWD64JsZH4yt1jak"></div>
                <span class="log-error" id="c-log-error"></span>
                <button class="submit" type="submit">Wyślij</button>
            </form>
        </div>
    </div>
    <div class="loading">
        <svg>
            <rect></rect>
        </svg>
    </div>
    <!--Cookie-->
    <div class="cookie-warning active">
        <div class="cookie-container">
            <div class="flex-container">
                <div>
                    <h3 class="cookie-title">Informacje o plikach cookie</h3>
                    <p class="cookie-text">
                        Ta strona używa plików cookie.
                        <a href="https://www.gov.pl/web/gov/polityka-dotyczaca-cookies" class="cookie-link">Czytaj
                            więcej</a>
                    </p>
                </div>
                <button class="cookie-btn" id="close-cookie">Ok</button>
            </div>
        </div>
    </div>
    <!--Scripts-->
    <script src="https://www.google.com/recaptcha/api.js"></script>
    <script src="js/task.js"></script>
    <script src="js/script.js"></script>
</body>

</html>