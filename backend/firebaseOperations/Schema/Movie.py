# Copyright 2017, Google, Inc.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from django.http import JsonResponse
from django.urls import reverse

from utlity import utility


class Movie(object):
    def __init__(self, id='', title='', description='', duration=0, rating=0, release_date='', year=0, country='',
                 language='', total_reviews='', genre=None, card_photo="", cover_photos=None, trailer_id=""):
        if cover_photos is None:
            cover_photos = []
        if genre is None:
            genre = []
        self.id = id
        self.title = title
        self.description = description
        self.duration = duration
        self.rating = rating
        self.release_date = release_date
        self.year = year
        self.country = country
        self.language = language
        self.total_reviews = total_reviews
        self.genre = genre
        self.card_photo = card_photo
        self.cover_photos = cover_photos
        self.trailer_id = trailer_id

    @staticmethod
    def from_dict(source, doc_id=""):
        # [START_EXCLUDE]
        movie = Movie(doc_id,
                      source[u'title'],
                      source[u'description'],
                      source[u'duration'],
                      source[u'rating'],
                      source[u'release_date'],
                      source[u'year'],
                      source[u'country'],
                      source[u'language'],
                      source[u'total_reviews'],
                      source[u'genre'],
                      source[u'card_photo'],
                      source[u'cover_photos'],
                      source[u'trailer_id'])

        if doc_id:
            movie.id = doc_id

        if u'title' in source:
            movie.title = source[u'title']

        if u'description' in source:
            movie.description = source[u'description']

        if u'duration' in source:
            movie.duration = source[u'duration']

        if u'rating' in source:
            movie.rating = source[u'rating']

        if u'release_date' in source:
            movie.release_date = source[u'release_date']

        if u'year' in source:
            movie.year = source[u'year']

        if u'country' in source:
            movie.country = source[u'country']

        if u'language' in source:
            movie.language = source[u'language']

        if u'total_reviews' in source:
            movie.total_reviews = source[u'total_reviews']

        if u'genre' in source:
            movie.genre = source[u'genre']

        if u'card_photo' in source:
            movie.card_photo = source[u'card_photo']

        if u'cover_photos' in source:
            movie.cover_photos = source[u'cover_photos']

        if u'trailer_id' in source:
            movie.trailer_id = source[u'trailer_id']

        return movie
        # [END_EXCLUDE]

    def to_dict(self):
        # [START_EXCLUDE]
        if self.cover_photos is None:
            self.cover_photos = []
        if self.genre is None:
            self.genre = []
        dest = {
            u'id': self.id,
            u'title': self.title,
            u'description': self.description,
            u'duration': self.duration,
            u'rating': self.country,
            u'release_date': self.release_date,
            u'year': self.year,
            u'country': self.country,
            u'language': self.language,
            u'total_reviews': self.total_reviews,
            u'genre': self.genre,
            u'card_photo': self.card_photo,
            u'cover_photos': self.cover_photos,
            u'trailer_id': self.trailer_id
        }

        if self.id:
            dest[u'id'] = self.id

        if self.title:
            dest[u'title'] = self.title

        if self.description:
            dest[u'description'] = self.description

        if self.duration:
            dest[u'duration'] = self.duration

        if self.rating:
            dest[u'rating'] = self.rating

        if self.release_date:
            dest[u'release_date'] = self.release_date

        if self.year:
            dest[u'year'] = self.year

        if self.country:
            dest[u'country'] = self.country

        if self.language:
            dest[u'language'] = self.language

        if self.total_reviews:
            dest[u'total_reviews'] = self.total_reviews

        if self.genre:
            dest[u'genre'] = self.genre

        if self.card_photo:
            dest[u'card_photo'] = self.card_photo

        if self.cover_photos:
            dest[u'cover_photos'] = self.cover_photos

        if self.trailer_id:
            dest[u'trailer_id'] = self.trailer_id
        return dest
        # [END_EXCLUDE]

    def __repr__(self):
        string_repr = f'Movie(id={self.id}, title={self.title}, description={self.description}, duration=' \
                      + f'{self.duration},rating={self.rating}, release_date={self.release_date}, year={self.year}, ' \
                      + f'country={self.country}, language={self.language}, total_reviews={self.total_reviews}, ' \
                      + f'genre={self.genre}, card_photo={self.card_photo}, cover_photos={self.cover_photos},' \
                      + f'trailer_id={self.trailer_id}) '
        return string_repr

    def get_absolute_url(self):
        return reverse("movie_detail:movie_detail", kwargs={"movie_id": self.id})

    def get_card_photos(self):
        return self.card_photo

    def get_title(self):
        return self.title

    def get_cover_photos(self):
        return self.cover_photos

    def get_cover_photos_json(self):
        return JsonResponse(self.cover_photos)

    def get_cover_photo(self):
        return self.cover_photos[0].get('small').get('download_url')

    def get_formatted_movie_date(self):
        return utility.format_day_month_year(self.release_date)

    def get_description_start(self):
        return self.description[:230]

    def get_description_end(self):
        return self.description[231:]

    def get_trailer_id(self):
        return self.trailer_id.split(',')

    @staticmethod
    def get_keys():
        return [
            'id', 'title', 'description', 'duration', 'rating', 'release_date', 'year', 'country', 'language',
            'total_reviews', 'genre', 'card_photo', 'cover_photos', 'trailer_id'
        ]
# [END custom_class_def]
