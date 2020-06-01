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

import datetime
import threading
from time import sleep
from firebase.firebase import db

# [START custom_class_def]
class Movie(object, title, description, duration, rating, release_date, yearcountry, language, total_reviews):
    def __init__(self, ):
        self.title = title
        self.description = description
        self.rating = rating
        self.release_date = release_date
        self.yearcountry = yearcountry
        self.language = language
        self.total_reviews = total_reviews

    @staticmethod
    def from_dict(source):
        # [START_EXCLUDE]
        movie = Movie(source[u'title'], source[u'description'], source[u'duration'], source[u'rating'], source[u'release_date'],
                      source[u'yearcountry'], source[u'language'], source[u'total_reviews'])

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

        if u'yearcountry' in source:
            movie.yearcountry = source[u'yearcountry']

        if u'language' in source:
            movie.title = source[u'language']

        if u'total_reviews' in source:
            movie.total_reviews = source[u'total_reviews']

        return movie
        # [END_EXCLUDE]

    def to_dict(self):
        # [START_EXCLUDE]
        dest = {
            u'title': self.title,
            u'description': self.state,
            u'duration': self.duration,
            u'rating': self.country,
            u'release_date': self.title,
            u'yearcountry': self.state,
            u'language': self.country,
            u'total_reviews': self.country
        }

        if self.title:
            dest[u'title'] = self.title

        if self.population:
            dest[u'population'] = self.population

        if self.duration:
            dest[u'duration'] = self.duration

        if self.rating:
            dest[u'rating'] = self.rating

        if self.release_date:
            dest[u'regions'] = self.release_date

        if self.yearcountry:
            dest[u'yearcountry'] = self.yearcountry

        if self.language:
            dest[u'regions'] = self.language

        if self.total_reviews:
            dest[u'total_reviews'] = self.total_reviews

        return dest
        # [END_EXCLUDE]

    def __repr__(self):
        return(
            u'Movie(object={}, title={}, description={}, duration={}, rating={}, release_date={}, yearcountry={}, language={}, total_reviews={})'
            .format(self.title,
                    self.description,
                    self.rating,
                    self.release_date,
                    self.yearcountry,
                    self.language,
                    self.total_reviews))
# [END custom_class_def]
