"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnHistoryPage = void 0;
function spawnHistoryPage(req, res) {
    res.send(`
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Onyx Fate | Model</title>
    <link rel="shortcut icon" href="/images/logo.ico">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" type="text/javascript"></script>
    <script src="/javascripts/preloader.js" type="text/javascript"></script>
    <link rel="stylesheet" href="/stylesheets/preloader.css">
    <link rel="stylesheet" href="/stylesheets/main.css">
</head>

<body>
<div class="preloader">
    <div class="loader"></div>
</div>
<div class="dark-light"><svg viewbox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
    </svg></div>
<div class="app">
    <div class="header">
        <div class="header-menu"><a class="menu-link is-active" href="#">Back to store</a><a class="menu-link" href="#">News</a></div>
        <div class="header-profile"><a class="notification" href="checkout"><svg id="Layer_1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="36px" viewbox="0 0 40 36" style="enable-background:new 0 0 40 36;" xml:space="preserve">
                    <g id="Page-1_4_" sketch:type="MSPage">
                        <g id="Desktop_4_" transform="translate(-84.000000, -410.000000)" sketch:type="MSArtboardGroup">
                            <path class="st0" id="cart" sketch:type="MSShapeGroup" d="M94.5,434.6h24.8l4.7-15.7H92.2l-1.3-8.9H84v4.8h3.1l3.7,27.8h0.1c0,1.9,1.8,3.4,3.9,3.4c2.2,0,3.9-1.5,3.9-3.4h12.8c0,1.9,1.8,3.4,3.9,3.4c2.2,0,3.9-1.5,3.9-3.4h1.7v-3.9l-25.8-0.1L94.5,434.6"></path>
                        </g>
                    </g>
                </svg></a><a class="profile-page"><img class="profile-img" alt=""></a></div>
    </div>
    <div class="wrapper">
        <div class="left-side">
            <div class="side-wrapper">
                <div class="side-title">Short-links</div>
                <div class="side-menu"><a href="/history-page"> History page </a><a href="/logout"> Log-out </a></div>
            </div>
        </div>
        <div class="main-container">
            <div class="content-wrapper">
                <div class="content-section">
                    <div class="content-section-title">Your transaction history
                        <!--Table ?-->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="overlay-app"></div>
</div>
<script src="/javascripts/script.js"></script>
<script src="/javascripts/upload-file.js"></script>
</body>
</html>
    `);
}
exports.spawnHistoryPage = spawnHistoryPage;
//# sourceMappingURL=browse-history.js.map