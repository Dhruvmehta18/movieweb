from django.shortcuts import render

from firebaseOperations.firestoreOperations.movieFirestore import get_movies_all


# Create your views here
def index(request):
    docs = get_movies_all()

    context = {
        'movies_list': docs,
    }
    return render(request, 'movie/movieIndex.html', context)
