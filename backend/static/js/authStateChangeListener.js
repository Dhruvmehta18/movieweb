const getRootUrl = () => window.location.origin
        ? `${window.location.origin}/`
        : `${window.location.protocol}/${window.location.host}/`;
const getContinueUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let continueUrl = urlParams.get('continue');
    if (continueUrl === null || continueUrl === '') {
        continueUrl = window.location.href;
    }
    return continueUrl;
}

firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        window.location.href = `${getRootUrl()}login?continue="${getContinueUrl()}"`;
    }
});
