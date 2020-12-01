from django.http import JsonResponse
from django.shortcuts import render

from firebaseOperations.firestoreOperations.movieFirestore import get_movies_all, get_carousels


# Create your views here
def index(request):
    docs = get_movies_all()

    context = {
        'movies_list': docs,
    }
    return render(request, 'movie/movieIndex.html', context)


def req_carousels(request):
    carousels = get_carousels()

    carousels_dict = {
        'movie_carousel': carousels,
    }
    return JsonResponse(carousels_dict)
