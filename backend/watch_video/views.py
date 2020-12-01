from django.shortcuts import render


# Create your views here.

# Create your views here
def watch_movie_page(request, movie_id):
    return render(request, 'watch_video/watch-video.html', {})
