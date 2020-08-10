$(document).ready(function () {
    let imageCounter = 0;
    const cover_image = document.getElementById('cover_image');
    const IMAGE_URLS = JSON.parse(document.getElementById('COVER_PHOTOS').textContent);
    let gvideoId = '';

    console.log(IMAGE_URLS);
    const setBackground = () => {
        imageCounter = (imageCounter + 1) % IMAGE_URLS.length;
        cover_image.src = IMAGE_URLS[imageCounter].large.download_url;
    };
    const setImage = () => {
        setBackground();
        cover_image.addEventListener("animationiteration", function () {
            setBackground();
        }, false);
    }
    setImage()
    /**
     * Element.requestFullScreen() polyfill
     * @author Chris Ferdinandi
     * @license MIT
     */

    let player;
    let player_trailer;
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    if (!Element.prototype.requestFullscreen) {
        Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen
            || Element.prototype.webkitRequestFullscreen
            || Element.prototype.msRequestFullscreen;
    }

// Listen for clicks
    const onYoutubeTrailerListener = (event) => {
        // Check if clicked element is a video thumbnail
        const videoId = event.target.getAttribute('data-video');
        if (!videoId) return;
        if (gvideoId === '') {
            gvideoId = videoId
            onYouTubeIframeAPIReady(videoId)
        } else if (gvideoId === videoId && player && player_trailer) {
            player_trailer.style.display = 'initial';
            player.playVideo();
            player_trailer.requestFullscreen();
        } else {
            gvideoId = videoId
            player_trailer.style.display = 'initial';
            player.loadVideoById(videoId);
            player_trailer.requestFullscreen();
        }
    }

    $('.youtube-thumbnails-container').on('click', '.youtube-thumbnail', onYoutubeTrailerListener);

    //  This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    function onYouTubeIframeAPIReady(videoId) {
        player = new YT.Player('youtube-trailer', {
            height: '150',
            width: '250',
            videoId: `${videoId}`,
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    //  The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        player_trailer = document.getElementById('youtube-trailer');
        player_trailer.requestFullscreen().finally(() => {
            player_trailer.style.display = 'initial';
            event.target.playVideo();
        })
    }

    function stopVideo() {
        player.stopVideo();
    }

    document.addEventListener('fullscreenchange', () => {
        // the value is null if there is no fullscreen element
        if (!document.fullscreenElement) {
            stopVideo()
            player_trailer.style.display = 'none';
        }
    })

    const moreButton = document.getElementById("moreButton");
    const favorite = document.getElementById("favorite");
    const like = document.getElementById("like");
    const dislike = document.getElementById("dislike");
    const watchLater = document.getElementById("watch-later");

    function moreButtonClicked() {
        const dots = document.getElementById("dots");
        const moreText = document.getElementById("more-description");
        const moreButtonText = document.getElementById("moreButtonText");
        if (dots.style.display === "none") {
            dots.style.display = "inline";
            moreButtonText.innerHTML = "Read more";
            moreText.style.display = "none";
        } else {
            dots.style.display = "none";
            moreButtonText.innerHTML = "Read less";
            moreText.style.display = "inline";
        }
    }

    function toggleButtonClicked(element, whenOffState, whenOnState, afterChangeState) {
        if (element.getAttribute("data-state") === "0") {
            if (whenOffState !== undefined) {
                whenOffState()
            }
        } else {
            if (whenOnState !== undefined) {
                whenOnState()
            }
        }
        if (afterChangeState !== undefined) {
            afterChangeState()
        }
    }

    function favoriteClicked() {
        const whenOffState = () => {
            favorite.childNodes[1].classList.remove("fa-heart-o");
            favorite.childNodes[1].classList.add("fa-heart");
            favorite.setAttribute("data-state", "1")
        }
        const whenOnState = () => {
            favorite.childNodes[1].classList.remove("fa-heart");
            favorite.childNodes[1].classList.add("fa-heart-o");
            favorite.setAttribute("data-state", "0")
        }
        toggleButtonClicked(this, whenOffState, whenOnState);
    }

    function likeClicked() {
        const whenOffState = () => {
            like.children[0].classList.add("text-primary");
            dislike.children[0].classList.remove("text-primary");
            like.setAttribute("data-state", "1");
            dislike.setAttribute("data-state", "0");
        }
        const whenOnState = () => {
            like.children[0].classList.remove("text-primary");
            like.setAttribute("data-state", "0");
        }
        toggleButtonClicked(this, whenOffState, whenOnState);
    }

    function disLikeClicked() {
        const whenOffState = () => {
            dislike.children[0].classList.add("text-primary");
            like.children[0].classList.remove("text-primary");
            dislike.setAttribute("data-state", "1");
            like.setAttribute("data-state", "0");
        }
        const whenOnState = () => {
            dislike.children[0].classList.remove("text-primary");
            dislike.setAttribute("data-state", "0");
        }
        toggleButtonClicked(this, whenOffState, whenOnState);
    }

    function watchLaterClicked() {
        const whenOffState = () => {
            this.children[0].classList.add("text-primary");
            this.setAttribute("data-state", "1")
        }
        const whenOnState = () => {
            this.children[0].classList.remove("text-primary");
            this.setAttribute("data-state", "0")
        }
        toggleButtonClicked(this, whenOffState, whenOnState);
    }

    moreButton.addEventListener('click', moreButtonClicked);
    favorite.addEventListener('click', favoriteClicked);
    like.addEventListener("click", likeClicked);
    dislike.addEventListener("click", disLikeClicked);
    watchLater.addEventListener("click", watchLaterClicked)
})
