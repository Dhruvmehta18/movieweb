from django import forms
from django.contrib.auth.models import User

from login.models import UserProfileInfo


class UserForm(forms.ModelForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Enter password'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'Email'}))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Confirm password'}))

    class Meta():
        model = User
        fields = ('username', 'email', 'password',)

    def clean(self):
        cleaned_data = super(UserForm, self).clean()
        password = cleaned_data.get("password")
        password1 = cleaned_data.get("password1")

        if password != password1:
            raise forms.ValidationError(
                'password and confirm_password does not match'
            )


class UserProfileInfo(forms.ModelForm):
    class Meta():
        model = UserProfileInfo
        fields = ('picture',)
