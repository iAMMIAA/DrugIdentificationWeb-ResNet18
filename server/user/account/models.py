from django.db import models
from django.contrib.auth.models import AbstractUser

#Django provided a log of feature such as: username, email and password
class CustomUser(AbstractUser):   
    id = models.AutoField(primary_key=True)
    fullname = models.CharField(max_length=100, null=True, blank=True)
    phonenumber = models.IntegerField(max_length=50, null = True, blank=True)
    age = models.PositiveIntegerField(null=True, blank = True)
    profession = models.CharField(max_length=100, null=True,blank = True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    location = models.CharField(max_length = 100, null=True, blank = True)

    USERNAME_FIELD = 'username' 

    def __str__(self):
        return self.username  
    
class drug(models.Model):
    def nameFile(instance, filename):
        return '/'.join(['images', str(instance.name), filename])

    idDrug = models.AutoField(primary_key=True)
    codeUser = models.ForeignKey(CustomUser, null=True, blank=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True)
    picture = models.ImageField(upload_to=nameFile, blank=True)