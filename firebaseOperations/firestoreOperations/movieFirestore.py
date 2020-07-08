import os

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from firebaseOperations.Schema.Movie import Movie

cred = credentials.Certificate(os.environ.get('GOOGLE_APPLICATION_CREDENTIALS'))
firebase_app = firebase_admin.initialize_app(cred)
db = firestore.client()
collection_name = u'movies'

__all__ = ['get_movies_all', 'get_movie_by_id', 'add_movie_db']


def get_movies_all():
    docs = db.collection(collection_name).stream()
    movie_list = []
    for doc in docs:
        print(doc.id)
        movie_list.append(Movie.from_dict(doc.to_dict(), doc.id))
    return movie_list


def get_movie_by_id(document_id):
    doc_ref = db.collection(collection_name).document(document_id)
    doc = doc_ref.get()
    movie = Movie.from_dict(doc.to_dict(), document_id)
    print(movie)
    return movie


def add_movie_db(movie):
    if isinstance(movie, Movie):
        db.collection(u'movies').add(movie.to_dict())
    else:
        return 'movie is of type Movie class'
