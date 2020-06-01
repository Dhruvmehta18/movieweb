import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import firestore, initialize_app

cred = credentials.Certificate(os.environ.get('GOOGLE_APPLICATION_CREDENTIALS'))
firebase_admin.initialize_app(cred)
db = firestore.client()
    
def getMoviesAll():
    docs = db.collection(u'movies').stream()
    movie_list = []
    for doc in docs:
        movie_list.append(doc.to_dict())
    return movie_list
    


