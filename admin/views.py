import datetime
import json

from django.core.exceptions import ValidationError
from django.core.validators import URLValidator
from django.http import JsonResponse, Http404
from django.shortcuts import render

from firebaseOperations.Schema.Movie import Movie
from firebaseOperations.firestoreOperations.movieFireStorage import *
from firebaseOperations.firestoreOperations.movieFireStorage import download_csv
from firebaseOperations.firestoreOperations.movieFirestore import *
from utlity.utility import *

validate = URLValidator()


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
        'languages': get_language_list(),
        'genres': get_genres_list()
    }
    return render(request, 'admin/admin.html', context)


def add_movie(request):
    data = {}
    if request.method == 'POST':
        _id = request.POST.get('id')
        title = request.POST.get('title')
        description = request.POST.get('description', 'No Description')
        duration = request.POST.get('duration', 0)
        rating = request.POST.get('rating', 0)
        release_date = request.POST.get('release_date')
        year = request.POST.get('year')
        country = request.POST.get('country')
        language = request.POST.get('language')
        total_reviews = request.POST.get('total_reviews')
        genre = request.POST.getlist('genre')
        card_photo = request.POST.get('card_photo')
        cover_photos = request.POST.get('cover_photos')
        trailer_id = request.POST.get('trailer_id')
        movie_dict = {
            'id': _id,
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
            'card_photo': json.loads(card_photo),
            'cover_photos': json.loads(cover_photos),
            'trailer_id': trailer_id
        }
        movie = Movie.from_dict(movie_dict, _id)
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


def delete_movie(request):
    data = {}
    if request.method == 'POST':
        movie_id = request.POST.get('movie_id')
        print(movie_id)
        delete_movie_db(movie_id)
        data['result'] = 'deleted resource'
        data['status'] = 'OK'
        return JsonResponse(data)
    else:
        data['error'] = 'POST METHOD IS ONLY VALID'
        return JsonResponse(data)


def url_upload(request):
    upload_url = request.GET.get('photo_url')
    movie_id = request.GET.get('movie_id')
    type_image = request.GET.get('type')
    data = {}
    if movie_id:
        try:
            folder_name = movie_id + str(unix_time_millis(datetime.datetime.utcnow()))
            download_url = upload_blob_by_url(upload_url, folder_name, movie_id, type_image)
            result = {
                'message': 'Uploaded',
                'download_url': download_url
            }
            data['result'] = result
            data['status'] = 'OK'
        except ValidationError as exception:
            data['error'] = f'{exception}'
        return JsonResponse(data)
    else:
        data['error'] = 'movie_id not found'
        data['status'] = '404'
        raise Http404(data)


def file_upload(request):
    data = {}
    if request.method == 'GET':
        file_name = request.GET.get('file_name')
        error = download_csv(file_name)

        data['error'] = error
        if error:
            data['status'] = 'FAILURE'
            data['message'] = "Successfully added to the database"
            return JsonResponse(data)
        else:
            data['status'] = 'OK'
            return JsonResponse(data)
    else:
        data['error'] = 'GET METHOD IS ONLY VALID'
    return JsonResponse(data)


def download_movies_file(request):
    data = {}
    if request.method == 'GET':
        data_type = request.GET.get('type', 'json')
        download_url, error = download_movies(data_type)
    
        data['error'] = error
        if error:
            data['status'] = 'FAILURE'
            return JsonResponse(data)
        else:
            result = {
                'message': 'Uploaded',
                'download_url': download_url
            }
            data['result'] = result
            data['status'] = 'OK'
            return JsonResponse(data)
    else:
        data['error'] = 'GET METHOD IS ONLY VALID'
    return JsonResponse(data)
