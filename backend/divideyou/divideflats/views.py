from django.shortcuts import render
from divideflats.serializers import PisoSerializer, PuntuacionesSerializer
from divideflats.models import Piso, Puntuacion
from rest_framework.decorators import api_view
from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status


@api_view(['POST','GET'])
def piso_list(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials

    if request.method == 'GET':
        pisos = Piso.objects.all()
           
        name = request.GET.get('name', None)
        if name is not None:
            pisos = pisos.filter(nombre__icontains=name)
        
        pisos_serializer = PisoSerializer(pisos, many=True)
        return JsonResponse(pisos_serializer.data[0], safe=False)
        # 'safe=False' for objects serialization
    elif request.method == 'POST':
        piso_data = JSONParser().parse(request)
        print(piso_data);
        piso_serializer = PisoSerializer(data=piso_data)
        if piso_serializer.is_valid():
            piso_serializer.save();
            return JsonResponse(piso_data, status=status.HTTP_201_CREATED)
        return JsonResponse(piso_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def piso_detail(request, pk):
    # find tutorial by pk (id)
    try: 
        piso = Piso.objects.get(pk=pk) 
    except Piso.DoesNotExist: 
        return JsonResponse({'message': 'The piso does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': 
        piso_serializer = PisoSerializer(piso) 
        return JsonResponse(piso_serializer.data)
    # GET / PUT / DELETE tutorial
    elif request.method == 'DELETE': 
        piso.delete() 
        return JsonResponse({'message': 'Piso was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def puntuaciones_list(request):
    if request.method == 'GET':
        puntuaciones = Puntuacion.objects.all()

        piso = request.GET.get('piso', None)
        if piso is not None:
            pisos = puntuaciones.filter(piso=piso)

        puntuaciones_serializer = PuntuacionesSerializer(pisos, many=True)
        return JsonResponse(puntuaciones_serializer.data, safe=False)
        # 'safe=False' for objects serialization
    elif request.method == 'POST':
        piso_data = JSONParser().parse(request)
        puntuaciones_serializer = PuntuacionesSerializer(data=piso_data)
        if puntuaciones_serializer.is_valid():
            puntuaciones_serializer.save();
            return JsonResponse(piso_data, status=status.HTTP_201_CREATED)
        return JsonResponse(puntuaciones_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
