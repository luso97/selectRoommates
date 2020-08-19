from rest_framework import serializers 
from divideflats.models import Piso,Puntuacion


class PisoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Piso
        fields = ('id','nombre','habitantes','habitaciones')

class PuntuacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model =Puntuacion
        fields = ('id','piso','puntuaciones','nombre');