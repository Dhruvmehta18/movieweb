$(document).ready(function () {
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

    $('#formMovieModal').on('shown.bs.modal', function () {
        $('#title-input').trigger('focus')
    })
    $("#add-movie").click(function () {
        const form = $("#add-movie-form");

        $.ajax({
            url: $(form).attr("data-add-movie-url"),
            data: new FormData(form[0]),
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


    /**
     * Sample JavaScript code for youtube.search.list
     * See instructions for running APIs Explorer code samples locally:
     * https://developers.google.com/explorer-help/guides/code_samples#javascript
     */


    $('#trailer-search-button').on('click', function () {
        $('#add-movie-dialog').css("pointer-events", "none");
        animateCSS(
            $('#search-overlay-box')
                .attr("style", "--animate-duration:0.25s")
                .show()
                .get(0),
            'slideInUp');
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
    $('#search-overlay-close-button').on('click', function () {
        $('#add-movie-dialog').css("pointer-events", "initial");
        animateCSS($('#search-overlay-box').get(0), 'slideOutDown').then(value => {
            $('#search-overlay-box').hide();
        });
    })
});
const STATE_YOUTUBE_TRAILER = {
    'START': 0,
    'LOADING': 1,
    'COMPLETED': 2,
}
let GoogleAuth, pageToken, query_prev, stateYoutubeTrailer = STATE_YOUTUBE_TRAILER.START, totalResult = 0,
    currentResult = 0, maxBatchResult = 5;
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
//     </div>
//   </div>
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
        imgContainer.classList.add('col-md-4', 'card-image');
        if (!skeleton) {
            const img = document.createElement('img');
            img.classList.add('card-img', 'image');
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
        setVideoList(video_list, false, pageToken);
        setPageToken(response.result.nextPageToken);
    }
    const onError = reason => {
        console.log("Execute error", reason);
        setVideoList([], false, null, reason.result.error);
    }
    setVideoList([], true, pageToken);
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
