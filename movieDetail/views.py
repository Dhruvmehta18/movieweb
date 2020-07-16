from django.http import JsonResponse, Http404, HttpResponseNotAllowed
from django.shortcuts import render

from firebaseOperations.firestoreOperations.movieFirestore import get_movie_by_id


# Create your views here
def movie_detail_page(request, movie_id):
    movie = get_movie_by_id(movie_id)

    context = {
        'movie': movie,
    }
    return render(request, 'movieDetail/movieDetail.html', context)


def movie_detail_data(request):
    data = {}
    if request.method == 'GET':
        movie_id = request.GET.get('movieId')

        if movie_id:
            movie = get_movie_by_id(movie_id, True)
            print(movie)
            if movie:
                data['movie'] = movie
                return JsonResponse(data)
            else:
                raise Http404('movie not found')
        else:
            raise Http404('movie id cannot be none')
    else:
        raise HttpResponseNotAllowed(['GET'])
