from django.urls import path

from . import views

app_name = 'admin'

urlpatterns = [
    path('admin/', views.admin_index, name="admin_main"),
    path('admin/add-movie/', views.add_movie, name="admin_add_movie"),
    path('admin/delete-movie/', views.delete_movie, name="admin_delete_movie")
]
