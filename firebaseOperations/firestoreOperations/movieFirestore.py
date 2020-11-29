import datetime
import os

import firebase_admin
from firebase_admin import credentials, firestore

from firebaseOperations.Schema.Movie import Movie

cred = credentials.Certificate(os.environ.get('GOOGLE_APPLICATION_CREDENTIALS'))
firebase_app = firebase_admin.initialize_app(cred)
db = firestore.client()
collection_name = u'movies'

__all__ = ['get_movies_all', 'get_movie_by_id', 'add_movie_db', 'delete_movie_db', 'get_carousels']


def get_movies_all():
    docs = db.collection(collection_name).stream()
    movie_list = []
    for doc in docs:
        print(doc.id)
        movie_list.append(Movie.from_dict(doc.to_dict(), doc.id))
    return movie_list


def get_movie_by_id(document_id, json=False):
    movie = None
    doc_ref = db.collection(collection_name).document(document_id)
    doc = doc_ref.get()
    print(doc)
    if doc.exists:
        if json:
            movie = doc.to_dict()
        else:
            movie = Movie.from_dict(doc.to_dict(), document_id)
    return movie


def add_movie_db(movie):
    if isinstance(movie, Movie):
        print("movie-id", movie.id)
        if movie.id:
            db.collection(collection_name).document(movie.id).set(movie.to_dict(), merge=True)
        else:
            db.collection(collection_name).add(movie.to_dict())
    else:
        return 'movie is of type Movie class'


def delete_movie_db(movie_id):
    db.collection(collection_name).document(movie_id).delete()


def get_carousels():
    date = datetime.datetime.now()
    (day, month, year) = (date.day, (date.month + 10) % 12 + 1, date.year + (date.month - 10) // 12)
    print(day, month, year)
    movie_carousels_query = db.collection(u'movies') \
        .where(u'release_date', u'>=', u'{0}-{1}-{2}'.format(year, month, day)) \
        .order_by(u'release_date', direction=firestore.Query.DESCENDING) \
        .limit(5)
    movie_carousels = movie_carousels_query.stream()
    # movie_carousels = db.collection("movies").where("releas")
    movie_list = []
    for doc in movie_carousels:
        movie_list.append(Movie.from_dict(doc.to_dict(), doc.id).to_dict())
    return movie_list
