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


def req_predictions_home(request):
    movies_carousels = get_movies_all()

    carousels_movie = {
        "carousel_list": [{"title": "Movies", "list": movies_carousels[:25]}, {"title": "Movies 2", "list": movies_carousels[25:]}]
    }

    return JsonResponse(carousels_movie)


def req_carousels(request):
    carousels = get_carousels()

    carousels_dict = {
        'adv_carousel': carousels,
    }
    return JsonResponse(carousels_dict)
