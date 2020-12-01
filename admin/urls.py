from django.urls import path

from . import views

app_name = 'admin'

urlpatterns = [
    path('admin/', views.admin_index, name="admin_main"),
    path('admin/add-movie/', views.add_movie, name="admin_add_movie"),
    path('admin/delete-movie/', views.delete_movie, name="admin_delete_movie"),
    path('admin/url-upload/', views.url_upload, name="admin_url_upload_movie"),
    path('admin/file_upload/', views.file_upload, name="admin_file_upload_movies"),
    path('admin/download_movies/', views.download_movies_file, name="download_movies")
]
