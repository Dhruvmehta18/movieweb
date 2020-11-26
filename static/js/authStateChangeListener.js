const getContinueUrl = () => {
    const getRootUrl = () => window.location.origin
        ? `${window.location.origin}/`
        : `${window.location.protocol}/${window.location.host}/`;
    const urlParams = new URLSearchParams(window.location.search);
    let continueUrl = urlParams.get('continue');
    if (continueUrl !== null || continueUrl === '') {
        continueUrl = getRootUrl();
    }
    return continueUrl;
}
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = `${getContinueUrl()}`;
    }
});
