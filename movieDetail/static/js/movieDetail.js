$(document).ready(function () {
    let imageCounter = 0;
    const cover_image = document.getElementById('cover_image');
    const IMAGE_URLS = cover_image.getAttribute('data-setbg').split(',');
    console.log(IMAGE_URLS);
    const setBackground = (image) => {
        cover_image.src = IMAGE_URLS[image].trim()
    };
    const setImage = () => {
        cover_image.addEventListener("animationiteration", function () {
            imageCounter = (imageCounter + 1) % IMAGE_URLS.length;
            setBackground(imageCounter)
        }, false)
    }
    setImage();

    /**
     * Element.requestFullScreen() polyfill
     * @author Chris Ferdinandi
     * @license MIT
     */

    let player;
    let player_trailer;
    const youtube_thumbnail = document.getElementById('youtube-thumbnail');
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
        if (player && player_trailer) {
            player_trailer.style.display = 'initial';
            player_trailer.requestFullscreen().finally(() => {
                player.playVideo();
            })
        } else {
            onYouTubeIframeAPIReady(videoId)
        }
    }

    youtube_thumbnail.addEventListener('click', onYoutubeTrailerListener, false);

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
            event.target.playVideo();
        })
    }

    function stopVideo() {
        player.stopVideo();
    }

    document.addEventListener('fullscreenchange', () => {
        // the value is null if there is no fullscreen element
        if (document.fullscreenElement) {
            if (player) {
                player.playVideo();
            }
        } else {
            stopVideo()
            player_trailer.style.display = 'none';
        }
    })

    const moreButton = document.getElementById("moreButton");

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

    moreButton.addEventListener('click', moreButtonClicked)
})
