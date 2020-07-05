from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.urls import reverse


# Create your views here.
def index(request):
    return HttpResponseRedirect(reverse('shop:product_list'))


@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('shop:product_list'))


@login_required
def special(request):
    return HttpResponse("You are logged in")


def register(request):
    return render(request, 'user/registration.html', {
        'title': 'Sign Up',
    })


def user_login(request):
    return render(request, 'user/login.html', {
        'title': 'Log In',
    })
