  
from django.contrib.auth.forms import UsernameField
from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class UserProfileInfo(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    picture = models.ImageField(upload_to='profile_pics',blank =True)
    
    def __str__(self):
        return self.user.username