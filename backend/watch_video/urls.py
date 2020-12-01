from django.urls import path

from . import views

app_name = 'movie_detail'

urlpatterns = [
    path('watch/<str:movie_id>', views.watch_movie_page, name='watch_movie_page'),
]
