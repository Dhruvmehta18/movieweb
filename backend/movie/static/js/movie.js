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

    function setMovieCarousels(movie_carousels=[]) {
        const carouselMovieCaptions = document.getElementById('carouselMovieCaptions')
        const carousels_indicator = carouselMovieCaptions.getElementsByClassName('carousel-indicators')[0]
        const carousels_inner = carouselMovieCaptions.getElementsByClassName('carousel-inner')[0]
        for (let i = 0; i < movie_carousels.length; i++) {
            const movie_carousel = movie_carousels[i]
            const indicator_item = document.createElement('li')
            if (i ===0) indicator_item.classList.add('active')
            indicator_item.setAttribute('data-target', '#carouselMovieCaptions')
            indicator_item.setAttribute('data-slide-to', i.toString())
            carousels_indicator.appendChild(indicator_item)

            const carouselItem = document.createElement('div')
            carouselItem.classList.add('carousel-item')
            if (i===0) carouselItem.classList.add('active')
            const carouselImage = document.createElement('img')
            carouselImage.src = movie_carousel.cover_photos[0].large.download_url
            carouselImage.className = "d-block w-100 mx-auto"
            carouselImage.alt = movie_carousel.title
            const blurImageContainer =  document.createElement('div')
            blurImageContainer.classList.add('blur-img-container')
            blurImageContainer.style = `background-image: url("${movie_carousel.cover_photos[0].small.download_url}")`
            const carouselCaption = document.createElement('div')
            carouselCaption.className = "carousel-caption d-none d-md-block"
            const photoContainer = document.createElement('div')
            photoContainer.classList.add('photoContainer')
            const imageContainer = document.createElement('div')
            imageContainer.className = "img-fluid img-container"
            imageContainer.appendChild(carouselImage)
            const slideLabel = document.createElement('h3')
            slideLabel.textContent = movie_carousel.title
            carouselCaption.appendChild(slideLabel)
            photoContainer.appendChild(blurImageContainer)
            photoContainer.appendChild(imageContainer)
            carouselItem.appendChild(photoContainer)
            carouselItem.appendChild(carouselCaption)
            carousels_inner.appendChild(carouselItem)

        }
    }

    const getMovieCarousels = () => {
        $.ajax({
            url: 'req_carousels',
            data: {},
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
            },
            success: function (data) {
                console.log(data)
                setMovieCarousels(data.movie_carousel)
            },
            error: function (xmlHttpRequestEventTarget, status, error) {
                console.log(error);
            }
        });
    }
    getMovieCarousels()

})
