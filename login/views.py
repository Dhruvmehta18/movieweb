from django.shortcuts import render
from login.forms import UserForm, UserProfileInfo
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import authenticate, login, logout


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
    if request.method == "POST":
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileInfo(data=request.POST)

        if user_form.is_valid() and profile_form.is_valid():
            print("2")
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            profile = profile_form.save(commit=False)
            profile.user = user

            if 'profile_pic' in request.FILES:
                profile.profile_pic = request.FILES['profile_pic']
            profile.save()
            return HttpResponseRedirect(reverse('shop:product_list'))
        else:
            print(user_form.errors, profile_form.errors)
    else:
        print("1")
        user_form = UserForm()
        profile_form = UserProfileInfo()
    return render(request, 'user/registration.html', {
        'user_form': user_form,
        'profile_form': profile_form,
    })


def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        if len(username) > 3 and len(password) > 3:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    login(request, user)
                    return HttpResponseRedirect(reverse('shop:product_list'))
                else:
                    return HttpResponse("ACCOUNT NOT ACTIVE")
            else:
                print("SOME TRY LOGIN")
                print("Username:{} and password {}".format(username, password))
                return render(request, 'user/login.html', {'notuser': "Invalid username or password", })
        else:
            return render(request, 'user/login.html',
                          {'invalidlen': "username and password should be greater than three", })
    else:
        return render(request, 'user/login.html', {})
