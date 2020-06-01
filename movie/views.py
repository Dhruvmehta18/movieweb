from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponse
from django.template import loader
from firebaseOperations.firestoreOperations.movieFirestore import getMoviesAll


# Create your views here
def index(request):
    docs=getMoviesAll()
    print(docs)
    
    context = {
        'movies_list': docs,
    }
    return render(request, 'movie/movieIndex.html', context)