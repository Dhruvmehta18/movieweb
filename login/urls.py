from django.urls import path

from . import views

app_name = 'login'

urlpatterns = [
    path('login/', views.user_login, name='user_login'),
    path('register/', views.register, name='register'),
]
