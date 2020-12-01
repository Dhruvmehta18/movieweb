$(document).ready(function () {
    $(document).ajaxSend(function (event, xhr, settings) {
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        function sameOrigin(url) {
            // url could be relative or scheme relative or absolute
            var host = document.location.host; // host + port
            var protocol = document.location.protocol;
            var sr_origin = '//' + host;
            var origin = protocol + sr_origin;
            // Allow absolute or scheme relative URLs to same origin
            return (url === origin || url.slice(0, origin.length + 1) === origin + '/') ||
                (url === sr_origin || url.slice(0, sr_origin.length + 1) === sr_origin + '/') ||
                // or any other URL that isn't scheme relative or absolute i.e relative.
                !(/^(\/\/|http:|https:).*/.test(url));
        }

        function safeMethod(method) {
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    });
    const animateCSS = (node, animation, prefix = 'animate__') => {
        // We create a Promise and return it
        return new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;

            node.classList.add(`${prefix}animated`, animationName);

            // When the animation ends, we clean the classes and resolve the Promise
            function handleAnimationEnd() {
                node.classList.remove(`${prefix}animated`, animationName);
                node.removeEventListener('animationend', handleAnimationEnd);

                resolve('Animation ended');
            }

            node.addEventListener('animationend', handleAnimationEnd);
        });
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function Alert(title = "", description = "", cancelButtonName = "Cancel", okButtonName = "Ok",
                   cancelButtonCallBack, okButtonCallBack) {
        $('#alert-title').text(title);
        $('#alert-body-text').text(description);
        cancelButtonName && $('#alert-negative-button').text(cancelButtonName).on('click', cancelButtonCallBack);
        okButtonCallBack && $('#alert-positive-button').text(okButtonName).on('click', okButtonCallBack);
    }

    const onCoverImageDeleted = (id) => {
        const childNodeEmpty = (childNode) => {
            $(childNode).remove();
            cover_photos = [
                ...(cover_photos.filter(((value1, index) => index !== id)))
            ];
            console.log(cover_photos);
        }
        const coverPhotosContainer = document.getElementById('cover-photos-container');
        const childNode = coverPhotosContainer.querySelector(`div[data-id="${id}"]`);
        requestAnimationFrame(() => childNodeEmpty(childNode));
    }
    const setCoverPhoto = (cover_photo, i) => {
        const coverPhotosContainer = document.getElementById('cover-photos-container');
        if (cover_photo !== '') {
            const col = document.createElement('div');
            col.classList.add('col', 'col-md-4', 'col-12');
            col.setAttribute('data-id', i);
            const imgWrap = document.createElement('div');
            imgWrap.classList.add('img-wrap');
            const span = document.createElement('span');
            span.classList.add('close');
            span.innerText = "\u00D7";
            $(span).on('click', () => onCoverImageDeleted(i));
            const img = document.createElement('img');
            img.classList.add('rounded');
            img.alt = `cover-photo-${i}`;
            $(img).attr("src", `${cover_photo.medium.download_url}`).on("error", function () {
                $(this).attr('src', fallbackImageUrl);
            });
            imgWrap.appendChild(span);
            imgWrap.appendChild(img);
            col.appendChild(imgWrap);
            coverPhotosContainer.appendChild(col);
        }
    }

    const setCoverPhotos = (cover_photos) => {
        const coverPhotosArray = cover_photos;
        for (let i = 0; i < coverPhotosArray.length; i++) {
            setCoverPhoto(coverPhotosArray[i], i);
        }
    }

    function setMovieForm(data, movieId) {
        console.log("data", data);
        const movie = data.movie;
        Object.keys(movie).forEach(function (key) {
            if (key === 'description') {
                const field = `textarea[name=${key}]`
                $(field).val(`${movie[key]}`);
            } else if (SELECT_FIELDS_NAME.includes(key)) {
                const field = `select[name=${key}]`
                $(field).val(`${movie[key]}`);
            } else {
                const field = `input[name=${key}]`
                $(field).val(`${movie[key]}`);
            }
        })
        $.each(movie['genre'], function (i, e) {
            $(`select[name="genre"] option[value="${e}"]`).prop("selected", true);
        });
        $('input[name=id]').val(movieId);
        setCardPhoto(movie['card_photo']);
        cover_photos = [
            ...movie['cover_photos']
        ]
        requestAnimationFrame(() => setCoverPhotos(cover_photos));
    }

    const fetchMovieById = (movieId) => {
        $.ajax({
            url: movie_detail_data_url,
            data: {movieId: movieId},
            method: 'GET',
            success: function (data, status) {
                console.log(data, status)
                if (status === 'success') {
                    setMovieForm(data, movieId);
                }
            },
            error: function (xmlHttpRequestEventTarget, status, error) {
                console.log(error);
            }
        })
    }

    $('#formMovieModal').on({
        'shown.bs.modal': function (event) {
            $('#title-input').trigger('focus');
            const elementClicked = event.relatedTarget;
            const movieId = $(elementClicked).attr("data-movie-id");
            if (movieId && movieId !== '') {
                fetchMovieById(movieId);
            }
        },
        'hide.bs.modal': function () {
            resetVariables();
            $('#add-movie-form').get(0).reset();
            $('#card-photo-form').attr("src", fallbackImageUrl);
            $('.blur-img-container').css("background-image", `url("${fallbackImageUrl}")`)
            closeSearchTrailerModal();
            $('#cover-photos-container').empty();
        }
    })
    const deleteMovie = (movieId) => {
        $.ajax({
            url: 'delete-movie/',
            data: {movie_id: movieId},
            method: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
            },
            success: function (data) {
                if (data.status === 'OK') {
                    alert('data deleted');
                } else {
                    alert(data.error);
                }
            },
            error: function (xmlHttpRequestEventTarget, status, error) {
                console.log(error);
            }
        });
    }
    $('#alertFormDialog').on({
        'shown.bs.modal': function (event) {
            const elementClicked = event.relatedTarget;
            const type = $(elementClicked).attr("data-type");
            const movieId = $(elementClicked).attr("data-movie-id");
            switch (type) {
                case 'delete-movie':
                    Alert('Delete Movie',
                        'Are your Sure to delete the selected movie', 'Cancel', 'Delete',
                        null,
                        () => deleteMovie(movieId))
                    break;
                default:
                    break;
            }
        },
        'hide.bs.modal': function () {

        }
    })

    $("#add-movie").click(function () {
        const form = $("#add-movie-form");
        const formData = new FormData(form[0]);
        formData.append('cover_photos', JSON.stringify(cover_photos));
        formData.append('card_photo', JSON.stringify(card_photo));
        $.ajax({
            url: $(form).attr("data-add-movie-url"),
            data: formData,
            method: 'POST',
            processData: false,
            contentType: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
            },
            success: function (data) {
                if (data.status === 'OK') {
                    alert('data added');
                } else {
                    alert(data.error);
                }
            },
            error: function (xmlHttpRequestEventTarget, status, error) {
                console.log(error);
            }
        });

    });

    $('#country-input').on('change', function () {
        if (this.value) {
            const code = $(this).find('option:selected').data("country-code");
            const url = `https://www.countryflags.io/${code}/flat/24.png`;
            $('#country-image').attr("src", url).attr("alt", this.value);
        }
    })

    $('#trailer-search-button').on('click', function () {
        $('#add-movie-dialog').css("pointer-events", "none");
        animateCSS(
            $('#search-overlay-box')
                .attr("style", "--animate-duration:0.25s")
                .show()
                .get(0),
            'slideInUp').then((value => {
            const trailerArray = $('#trailer-input').val().trim().split(',');
            if (trailerArray.length !== 0 && trailerArray[0] !== '') {
                inputTrailerCards = [
                    ...trailerArray
                ]
            }
        }));
    })
    const $searchMovieInput = $('#search-movie-input');

    function searchButtonFetchList() {
        const query = $searchMovieInput.val().trim();
        if (query !== '' && query !== query_prev) {
            query_prev = query
            pageToken = null
            stateYoutubeTrailer = STATE_YOUTUBE_TRAILER.START
            totalResult = 0;
            currentResult = 0
            $('#video-search-group').empty();
            searchByKeyword(query, getPageToken());
        }
    }

    $searchMovieInput.on('keypress', (event) => {
        const keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode === 13) {
            searchButtonFetchList();
        }
    })

    $('#search-movie-button').on('click', function () {
            searchButtonFetchList();
        }
    );

    $('#search-overlay-body')
        .on('scroll', function () {
            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                // ajax call get data from server and append to the div
                if (stateYoutubeTrailer !== STATE_YOUTUBE_TRAILER.LOADING) {
                    searchByKeyword(query_prev, getPageToken());
                }
            }
        });
    const clearSelectedVideos = () => {
        selectTrailerCards = [];
        $('#video-search-group .card.card-clicked').removeClass('card-clicked');
        afterCardSelected();
    }
    const closeSearchTrailerModal = () => {
        $('#add-movie-dialog').css("pointer-events", "initial");
        animateCSS($('#search-overlay-box').get(0), 'slideOutDown').then(value => {
            
        }).finally(()=>{
            clearSelectedVideos();
            $('#search-overlay-box').hide();
        });
    }
    $('#search-overlay-close-button').on('click', function () {
        closeSearchTrailerModal()
    })
    $('#search-overlay-clear-button').on('click', function () {
        clearSelectedVideos()
    })

    $('#search-overlay-done-button').on('click', function () {
        $('#trailer-input').val(selectTrailerCards.toString());
        closeSearchTrailerModal()
    })

    $('#add-url-button').on('click', () => {
        const coverInput = JSON.parse($('#cover-photo-input').val().trim());
        cover_photos = [
            ...cover_photos,
            coverInput
        ]
        requestAnimationFrame(() => setCoverPhoto(coverInput, cover_photos.length))
    })

    $('#url-to-firestore-button').on('click', (e) => {
        e.preventDefault();
        const coverInput = $('#cover-photo-input').val().trim();
        const movie_id = $('input[name="id"]').val().trim();
        $.ajax({
            method: 'GET',
            url: 'url-upload',
            data: {
                photo_url: coverInput,
                movie_id: movie_id,
                type: 'cover'
            },
            success: function (data) {
                if (data.status === 'OK') {
                    alert(data.result.message);
                    const thumbnail = data.result.download_url
                    $('#cover-photo-input').val('');
                    cover_photos = [
                        ...cover_photos,
                        thumbnail
                    ]
                    requestAnimationFrame(() => setCoverPhoto(thumbnail, cover_photos.length))
                } else {
                    alert(data.error);
                }
            },
            error: function (xmlHttpRequestEventTarget, status, error) {
                console.log(error);
            }
        });
    });

    function setCardPhoto(thumbnail) {
        if (thumbnail && thumbnail.large && thumbnail.large.download_url) {
            $('#card-photo-form').attr("src", `${thumbnail.large.download_url}`).on("error", function () {
                $(this).attr('src', fallbackImageUrl);
            });
            $('.blur-img-container').css("background-image", `url("${thumbnail.small.download_url}")`);
        } else {
            $('#card-photo-form').attr("src", `${fallbackImageUrl}`);
        }
        card_photo = thumbnail
    }

    $('#card-url-to-firestore-button').on('click', (e) => {
        e.preventDefault();
        const cardInput = $('#card-photo-input').val().trim();
        const movie_id = $('input[name="id"]').val().trim();
        $.ajax({
            method: 'GET',
            url: 'url-upload',
            data: {
                photo_url: cardInput,
                movie_id: movie_id,
                type: 'card'
            },
            success: function (data) {
                if (data.status === 'OK') {
                    alert(data.result.message);
                    const thumbnail = data.result.download_url
                    $('#card-photo-input').val('');
                    setCardPhoto(thumbnail);
                } else {
                    alert(data.error);
                }
            },
            error: function (xmlHttpRequestEventTarget, status, error) {
                console.log(error);
            }
        });
    });
    $('#downloadMovies').on('click', (e)=>{
        $.ajax({
            method: 'GET',
            url: 'download_movies',
            data: {
                type: 'json'
            },
            success: function (data) {
                if (data.status === 'OK') {
                    const thumbnail = data.result.download_url
                    download_file('movies.json', thumbnail, 'application/json')
                } else {
                    console.e(data.error);
                }
            },
            error: function (xmlHttpRequestEventTarget, status, error) {
                console.log(error);
            }
        });
    })
});

const STATE_YOUTUBE_TRAILER = {
    'START': 0,
    'LOADING': 1,
    'COMPLETED': 2,
}
const SELECT_FIELDS_NAME = ['country', 'language'];
const fallbackImageUrl = 'https://firebasestorage.googleapis.com/v0/b/movieweb-ec15f.appspot.com/o/static%2FfallbackImage.svg?alt=media&token=75557a2d-1bd4-4862-ad11-10a14cbbdb72';

const storage = firebase.storage();
// Create a storage reference from our storage service
const storageRef = storage.ref();
const tempUploadRef = storageRef.child('uploadTempFolder');
let GoogleAuth, pageToken, query_prev, stateYoutubeTrailer = STATE_YOUTUBE_TRAILER.START, totalResult = 0,
    currentResult = 0, maxBatchResult = 5, selectTrailerCards = [], inputTrailerCards = [], cover_photos = [],
    card_photo = {};
// <div class="card mb-3" style="max-width: 540px;">
//   <div class="row no-gutters">
//     <div class="col-md-4">
//       <img src="..." class="card-img" alt="...">
//     </div>
//     <div class="col-md-8">
//       <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
//       </div>
function resetVariables() {
    pageToken = null;
    query_prev = null;
    stateYoutubeTrailer = STATE_YOUTUBE_TRAILER.START;
    totalResult = 0;
    currentResult = 0;
    maxBatchResult = 5;
    selectTrailerCards = [];
    inputTrailerCards = [];
    cover_photos = [];
    card_photo = {};
}

function download_file(name, download_url, mime_type="text/plain") {

    var dlink = document.createElement('a');
    dlink.download = name;
    dlink.href = download_url
    dlink.target = "_blank"
    dlink.onclick = (e) => {
        // revokeObjectURL needs a delay to work properly
        setTimeout(function() {
            window.URL.revokeObjectURL(this.href);
        }, 2000);
    };
    document.body.appendChild(dlink)
    dlink.click();
    dlink.remove();
    document.body.removeChild(dlink)
}

function afterCardSelected() {
    if (selectTrailerCards.length > 0) {
        $("#select-display-video").show();
        $('#search-modal-footer').addClass('select-card');
        $('#search-overlay-done-button').show();
    } else {
        $("#select-display-video").hide();
        $('#search-modal-footer').removeClass('select-card');
        $('#search-overlay-done-button').hide();
    }
    $('#no-selected').text(`${selectTrailerCards.length}`);
}

function trailerCardClicked(event) {
    const card = event.currentTarget
    const videoId = $(card).attr('data-videoid');
    console.log(videoId);
    if (!($(card).hasClass('card-clicked'))) {
        selectTrailerCards = [
            ...selectTrailerCards,
            videoId
        ]
    } else {
        selectTrailerCards = selectTrailerCards.filter((value => value !== videoId))
    }
    $(card).toggleClass('card-clicked');
    afterCardSelected();
}

function setVideoList(video_list = [], skeleton = false, pageToken, error) {
    const videoSearchCardGroup = document.getElementById('video-search-group');
    if (error) {
        $(videoSearchCardGroup).empty();
        const template = `<div style="
    width: 100%;
    text-align: center;
    display: inline-flex;
    flex-direction: column;
    flex: 1;"><h1 class="display-4 gutter-bottom">${error.code}</h1><p class="lead">${error.message}</p></div>`
        $(videoSearchCardGroup).html(template);
        return;
    }
    if (pageToken === null) {
        $(videoSearchCardGroup).empty();
    }
    if (!skeleton && (currentResult < totalResult)) {
        for (let i = currentResult; i < videoSearchCardGroup.childElementCount;) {
            const card = videoSearchCardGroup.childNodes[i];
            $(card).remove();
        }
    }
    const length = skeleton ? maxBatchResult : video_list.length;
    for (let i = 0; i < length; i++) {
        const video = video_list[i];
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.style.flex = "auto";
        const row = document.createElement('div');
        row.classList.add('row', 'no-gutters', 'movie-row-card');
        const imgContainer = document.createElement('figure');
        imgContainer.classList.add('col-md-4', 'card-image', 'figure');
        if (!skeleton) {
            const img = document.createElement('img');
            img.classList.add('card-img', 'image', 'figure-img', 'img-fluid', 'rounded');
            img.src = `${video.snippet.thumbnails.medium.url}`;
            img.alt = 'Youtube movie trailer';
            imgContainer.appendChild(img);
        } else {
            imgContainer.classList.add('loading');
        }
        const textContainer = document.createElement('div');
        textContainer.classList.add('col-md-8');
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        const cardTitle = document.createElement('h6');
        cardTitle.classList.add('card-title');
        const cardDescription = document.createElement('p');
        cardDescription.classList.add('card-text');
        if (skeleton) {
            cardTitle.classList.add('loading');
            cardDescription.classList.add('loading');
        } else {
            card.setAttribute("data-videoId", `${video.id.videoId}`)
            cardTitle.textContent = `${video.snippet.title}`;
            cardDescription.textContent = `${video.snippet.description}`;
        }
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardDescription);
        textContainer.appendChild(cardBody);
        row.appendChild(imgContainer);
        row.appendChild(textContainer);
        card.appendChild(row);
        if (!skeleton) {
            card.addEventListener('click', trailerCardClicked);
            if (inputTrailerCards.length > 0 && inputTrailerCards.includes(video.id.videoId)) {
                selectTrailerCards = [
                    ...selectTrailerCards,
                    video.id.videoId
                ]
                inputTrailerCards = inputTrailerCards.filter((value => value === video.id.videoId))
                card.classList.add('card-clicked');
                afterCardSelected();
            }
        }
        videoSearchCardGroup.appendChild(card);
    }
    if (skeleton) {
        totalResult = totalResult + length;
    } else {
        currentResult = totalResult;
    }
}

function setPageToken(mPageToken) {
    pageToken = mPageToken;
}

function getPageToken() {
    return pageToken;
}

function searchByKeyword(query, pageToken) {
    stateYoutubeTrailer = STATE_YOUTUBE_TRAILER.LOADING
    const defaultParams = {
        "part": [
            "snippet",
            "id"
        ],
        "q": `${query}`,
        "alt": "json",
        "prettyPrint": true,
        "type": "video",
    }
    let params = {
        ...defaultParams,
    };
    if (pageToken) {
        params = {
            ...params,
            "pageToken": `${pageToken}`
        }
    }
    const onResponse = response => {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        const video_list = response.result.items
        requestAnimationFrame(() => setVideoList(video_list, false, pageToken))
        setPageToken(response.result.nextPageToken);
    }
    const onError = reason => {
        console.log("Execute error", reason);
        requestAnimationFrame(() => setVideoList([], false, null, reason.result.error));
    }
    requestAnimationFrame(() => setVideoList([], true, pageToken));
    return gapi.client.youtube.search.list(params).then((response) => onResponse(response), reason => onError(reason)
    ).then(() => {
        setTimeout(() => {
            stateYoutubeTrailer = STATE_YOUTUBE_TRAILER.COMPLETED
        }, 150);
    });
}

function loadClient() {
    const API_KEY = 'AIzaSyBNdCbxVN56FzfbHOvlkxbQnboEhj9LP0o'
    gapi.client.init({
        'apiKey': API_KEY
    });
    GoogleAuth = gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function () {
                console.log("GAPI client loaded for API");
            },
            function (err) {
                console.log("Error loading GAPI client for API", err);
            });
    return GoogleAuth
}

function handleClientLoad() {
    gapi.load('client', loadClient);
}

// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area");

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight() {
    dropArea.classList.add('highlight')
}

function unhighlight() {
    dropArea.classList.remove('highlight')
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
}

let uploadProgress = []
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
    progressBar.value = 0
    uploadProgress = []

    for (let i = numFiles; i > 0; i--) {
        uploadProgress.push(0)
    }
}

function updateProgress(fileNumber, percent) {
    uploadProgress[fileNumber] = percent
    let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
    progressBar.value = total
}

function handleFiles(files) {
    files = [...files]
    initializeProgress(files.length)
    files.forEach(uploadFile)
    // files.forEach(previewFile)
}

function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
        let img = document.createElement('img')
        img.src = file.src
        document.getElementById('gallery').appendChild(img)
    }
}

function uploadFile(file, i) {
    const metadata = {
        contentType: `${file.type}`
    }
    const uploadTask = tempUploadRef.child(file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            updateProgress(i, progress);
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    console.log("User doesn't have permission to access the object");
                    break;

                case 'storage/canceled':
                    console.log("User canceled the upload");
                    break;

                case 'storage/unknown':
                    console.log(`Unknown error occurred, inspect ${error.serverResponse}`);
                    break;
            }
        }, function () {
            afterUploadFile(file.name)
        });

    function afterUploadFile(file_name){
        $.ajax({
            method: 'GET',
            url: 'file_upload',
            data: {
                file_name: file_name
            },
            success: function (data) {
                if (data.status === 'OK') {
                    alert(data.message);
                    window.location.reload()
                } else {
                    alert(data.error);
                }
            },
            error: function (xmlHttpRequestEventTarget, status, error) {
                console.log(error);
            }
        });
    }
}
