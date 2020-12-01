from django.db import models

# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length = 100)

    def __str__(self):
        pass

    class Meta:
        db_table = 'movie'
        managed = True
        verbose_name = 'Movie'
        verbose_name_plural = 'Movies'