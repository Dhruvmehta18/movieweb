import posixpath
from urllib.parse import urljoin

from django import template
from django.template.defaultfilters import stringfilter

register = template.Library()


@register.simple_tag()
def multiply(number, times):
    # you would need to do any localization of the result here
    return number * times


@register.filter
@stringfilter
def country_image(country_name):
    # you would need to do any localization of the result here
    url_path = posixpath.join(country_name.lower(), 'flat/64.png')
    return urljoin('https://www.countryflags.io/', url_path)
