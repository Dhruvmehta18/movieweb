from django.http import JsonResponse
from django.shortcuts import render

from firebaseOperations.Schema.Movie import Movie
from firebaseOperations.firestoreOperations.movieFirestore import *
from utlity.utility import get_country_list, get_language_list


# Create your views here

def admin_index(request):
    movie_object_list = get_movies_all()
    movie_list = []

    for movie in movie_object_list:
        movie_list.append(movie.to_dict())

    context = {
        'movie_list': movie_list,
        'movie_keys': Movie.get_keys(),
        'number_select_rows': [i * 20 for i in range(1, 6)],
        'country_list': get_country_list(),
        'languages': get_language_list()
    }
    return render(request, 'admin/admin.html', context)


def add_movie(request):
    data = {}
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description', 'No Description')
        duration = request.POST.get('duration', 0)
        rating = request.POST.get('rating', 0)
        release_date = request.POST.get('release_date')
        year = request.POST.get('year')
        country = request.POST.get('country')
        language = request.POST.get('language')
        total_reviews = request.POST.get('total_reviews')
        genre = request.POST.get('genre')
        card_photo = request.POST.get('card_photo')
        cover_photos = request.POST.get('cover_photos')
        trailer_id = request.POST.get('trailer_id')

        movie_dict = {
            'title': title,
            'description': description,
            'duration': duration,
            'rating': rating,
            'release_date': release_date,
            'year': year,
            'country': country,
            'language': language,
            'total_reviews': total_reviews,
            'genre': genre,
            'card_photo': card_photo,
            'cover_photos': cover_photos,
            'trailer_id': trailer_id
        }
        movie = Movie.from_dict(movie_dict)
        error = add_movie_db(movie)
        data['error'] = error
        if error:
            data['status'] = 'FAILURE'
            return JsonResponse(data)
        else:
            data['status'] = 'OK'
            return JsonResponse(data)
    else:
        data['error'] = 'POST METHOD IS ONLY VALID'
        return JsonResponse(data)
