let url = window.location.href;

let params = new URLSearchParams(url.search);

function setParamsLogout(toLogout) {
    params.set('logout', toLogout);
}