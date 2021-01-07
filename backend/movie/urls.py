from django.contrib import admin
from django.urls import path
from . import views

app_name = 'movie'

urlpatterns = [
    path('', views.index, name='movie_index'),
    path('adv-carousels', views.req_carousels, name="req_carousels"),
    path('predictions-home', views.req_predictions_home, name="req_predictions_home")
]
