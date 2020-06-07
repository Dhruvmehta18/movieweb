from django.urls import path

from . import views

app_name = 'movie_detail'

urlpatterns = [
    path('detail/<str:movie_id>/', views.movie_detail_page, name='movie_detail')
]
