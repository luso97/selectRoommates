from django.db import models
# Create your models here.
class Piso(models.Model):
    nombre = models.CharField(max_length=30,blank=False,default='');
    habitantes = models.CharField(max_length=202,blank=False,default='');
    habitaciones = models.CharField(max_length=40, blank=False,default='');
class Puntuacion(models.Model):
    piso = models.ForeignKey(Piso,on_delete=models.CASCADE);
    puntuaciones = models.CharField(max_length=250)
    nombre = models.CharField(max_length=35);
