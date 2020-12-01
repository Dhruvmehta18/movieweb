import csv
import io
import os
import posixpath
import re
from os import path
import json

import requests
from PIL import Image
from google.cloud import storage

from firebaseOperations.Schema.Movie import Movie
from firebaseOperations.firestoreOperations.movieFirestore import add_movie_db, get_movies_json

client = storage.Client()
bucket = client.get_bucket('movieweb-ec15f.appspot.com')

main_dir = 'movies'
image_file_format = 'jpg'
image_quality = 90

small_image_cover_size = (300, 300)
medium_image_cover_size = (700, 700)
large_image_cover_size = (1700, 1700)

small_image_card_size = (120, 120)
medium_image_card_size = (400, 400)
large_image_card_size = (700, 700)

file_size_cover_list = [small_image_cover_size, medium_image_cover_size, large_image_cover_size]
file_size_card_list = [small_image_card_size, medium_image_card_size, large_image_card_size]

file_name_list = ['small', 'medium', 'large']
file_types_no = 3

cover_photo_dict = {
    'download_url_path': '',
    'small': {
        'size': {
            'width': small_image_cover_size[0],
            'height': small_image_cover_size[1]
        },
        'download_url': ''
    },
    'medium': {
        'size': {
            'width': medium_image_cover_size[0],
            'height': medium_image_cover_size[1]
        },
        'download_url': ''
    },
    'large': {
        'size': {
            'width': large_image_cover_size[0],
            'height': large_image_cover_size[1]
        },
        'download_url': ''
    },
}

card_photo_dict = {
    'download_url_path': '',
    'small': {
        'size': {
            'width': small_image_card_size[0],
            'height': small_image_card_size[1]
        },
        'download_url': ''
    },
    'medium': {
        'size': {
            'width': medium_image_card_size[0],
            'height': medium_image_card_size[1]
        },
        'download_url': ''
    },
    'large': {
        'size': {
            'width': large_image_card_size[0],
            'height': large_image_card_size[1]
        },
        'download_url': ''
    },
}

__all__ = ['upload_blob_by_url', 'download_csv', 'download_movies']


def get_photo_dict(type_image):
    if type_image == 'cover':
        return cover_photo_dict
    else:
        return card_photo_dict


def get_file_size(type_image):
    if type_image == 'cover':
        return file_size_cover_list
    else:
        return file_size_card_list


def upload_blob_by_url(source_image_url, folder_name, movie_id, type_image='cover'):
    response = requests.get(source_image_url)
    content_type = response.headers.get('content-type')
    main_type, sub_type = content_type.split('/')
    if main_type == 'image':
        image_bytes = io.BytesIO(response.content)
        file_size_list = get_file_size(type_image)
        photo_dict = get_photo_dict(type_image)
        for i in range(0, file_types_no):
            image_ref = Image.open(image_bytes)
            image_ref.thumbnail(file_size_list[i])
            image_buf = io.BytesIO()
            image_ref.save(image_buf, format='JPEG', quality=image_quality)
            root, ext = path.splitext(file_name_list[i])
            if not ext or ext != image_file_format:
                ext = f'.{image_file_format}'
            destination_blob_dir_name = root + ext
            destination_dir = posixpath.join(main_dir, movie_id, type_image, folder_name)
            destination_path = posixpath.join(destination_dir, destination_blob_dir_name)
            photo_dict['download_url_path'] = destination_dir
            blob = bucket.blob(destination_path)
            # posting to firebase storage
            blob.upload_from_string(image_buf.getvalue(), content_type=f'image/{image_file_format}')
            blob.make_public()
            blob_name = bucket.get_blob(destination_path)
            download_url = blob_name.public_url
            photo_dict[file_name_list[i]]['download_url'] = download_url

        return photo_dict
    else:
        return None, 'content type of url is not image'


def download_csv(file_name):
    blob = bucket.get_blob("uploadTempFolder/{0}".format(file_name))
    if blob.exists():
        file_csv_bytes = blob.download_to_filename(file_name)
        with open(file_name, "r") as file_csv:
            csv_reader = csv.DictReader(file_csv)
            line_count = 0
            for row in csv_reader:
                if line_count == 0:
                    print(f'Column names are {", ".join(row)}')
                    line_count += 1
                else:
                    if row['title']:
                        movie_dict = {
                            'id': None,
                            'title': row['title'],
                            'description': row['description'],
                            'duration': row['duration'],
                            'rating': row['rating'],
                            'release_date': row['release_date'],
                            'year': row['year'],
                            'country': row['country'],
                            'language': row['language'],
                            'total_reviews': row['total_reviews'],
                            'genre': row['genre'].split(","),
                            'card_photo': row['card_photo'],
                            'cover_photos': row['cover_photos'],
                            'trailer_id': row['trailer_id']
                        }
                        error = add_movie_db(Movie.from_dict(movie_dict, None))
                        if error:
                            return error
                line_count += 1
            print(f'Processed {line_count} lines.', end="\r")
        if os.path.isfile(file_name):
            os.remove(file_name)
        blob.delete()


def download_movies(data_type):
    destination_path = posixpath.join('downloadTempFolder', 'movies.json')
    blob = bucket.blob(destination_path)
    
    if data_type == 'json':
        movie_json = get_movies_json()
        blob.upload_from_string(movie_json, content_type="application/json")
    else:
        return None, '{data_type} format is not supported'.format(data_type)
    
    blob.make_public()
    download_url = blob.public_url
    return download_url, None    
