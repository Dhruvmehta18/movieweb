from django.shortcuts import render

from firebaseOperations.firestoreOperations.movieFirestore import get_movie_by_id


# Create your views here
def movie_detail_page(request, movie_id):
    movie = get_movie_by_id(movie_id)

    context = {
        'movie': movie,
    }
    return render(request, 'movieDetail/movieDetail.html', context)
