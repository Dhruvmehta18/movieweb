const movie_player = videojs('my-video')
movie_player.ready(function () {
    this.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
        enableModifiersForNumbers: false,
        alwaysCaptureHotkeys: true
    });
});
movie_player.addClass('movie-player');

const html5VideoPlayer = document.getElementsByClassName("html5-video-player")[0];
const aspectRatio = 16 / 9;
let rtime;
let timeout = false;
const delta = 500;
const bottomSpacing = 150

function resizeEnd() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeEnd, delta);
    } else {
        timeout = false;
        requestAnimationFrame(setVideoDimension);
    }
}

function setVideoDimension() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const aspectRatioWidth = windowWidth / aspectRatio;
    const width = windowWidth;
    const height = windowHeight > aspectRatioWidth + bottomSpacing ? aspectRatioWidth : windowHeight - bottomSpacing;
    html5VideoPlayer.style.width = `${width}px`;
    html5VideoPlayer.style.height = `${height}px`;
}

function resizeWindow() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeEnd, delta);
    }
}

window.addEventListener('resize', resizeWindow);
resizeWindow();
movie_player.src(
    {
        src: 'https://fragmenttranscodedmovieoutput.s3.ap-south-1.amazonaws.com/movie/trailer_1080p.mpd',
        type: 'application/dash+xml'
    });
movie_player.hlsQualitySelector();
movie_player.play();
