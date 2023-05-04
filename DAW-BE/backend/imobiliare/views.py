from datetime import datetime
import pytz
from django.http import JsonResponse
# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

from imobiliare.models import Locuinta, Reservation
from imobiliare.serializers import LocuintaSerializer, ReservationSerializer, ReservationWithNameSerializer
from users.models import User


@api_view(['GET', 'POST', 'DELETE'])
def locuinte_list(request):
    if request.method == 'GET':
        locuinte = Locuinta.objects.all()
        locuinte_serializer = LocuintaSerializer(locuinte, many=True)
        return JsonResponse(locuinte_serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        locuinta_serializer = LocuintaSerializer(data=data)
        if locuinta_serializer.is_valid():
            locuinta_serializer.save()
            return JsonResponse(locuinta_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(locuinta_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Locuinta.objects.all().delete()
        return JsonResponse({'message': '{} Residences were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def locuinte_detail(request, id):
    try:
        locuinta = Locuinta.objects.get(pk=id)
    except Locuinta.DoesNotExist:
        return JsonResponse({'message': 'The residence does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        locuinta_serializer = LocuintaSerializer(locuinta)
        return JsonResponse(locuinta_serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        locuinta_serializer = LocuintaSerializer(locuinta, data=data)
        if locuinta_serializer.is_valid():
            locuinta_serializer.save()
            return JsonResponse(locuinta_serializer.data)
        return JsonResponse(locuinta_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        locuinta.delete()
        return JsonResponse({'message': 'Residence was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def locuinte_list_by_type(request, transaction_type, type):
    locuinte = Locuinta.objects.filter(transaction_type=transaction_type, type=type)

    if request.method == 'GET':
        locuinta_serializer = LocuintaSerializer(locuinte, many=True)
        return JsonResponse(locuinta_serializer.data, safe=False)


@api_view(['GET'])
def locuinte_list_by_locuinta_type(request, type):
    locuinte = Locuinta.objects.filter(type=type)

    if request.method == 'GET':
        locuinta_serializer = LocuintaSerializer(locuinte, many=True)
        return JsonResponse(locuinta_serializer.data, safe=False)


@api_view(['GET'])
def locuinte_list_by_user(request, user_id, type):
    locuinte = Locuinta.objects.filter(user_id=user_id, type=type)

    if request.method == 'GET':
        locuinta_serializer = LocuintaSerializer(locuinte, many=True)
        return JsonResponse(locuinta_serializer.data, safe=False)


@api_view(['GET'])
def locuinte_news(request):
    locuinte = Locuinta.objects.order_by('-date_added')[:8:-1]

    if request.method == 'GET':
        locuinta_serializer = LocuintaSerializer(locuinte, many=True)
        return JsonResponse(locuinta_serializer.data, safe=False)


@api_view(['POST'])
def make_reservation(request):
    # data = JSONParser().parse(request)
    user_id = request.data['user_id']
    locuinta_id = request.data['locuinta_id']
    date_time = request.data['date_time']

    user = User.objects.get(id=user_id)
    locuinta = Locuinta.objects.get(id=locuinta_id)
    reservation = Reservation(user=user, locuinta=locuinta, date_time=date_time)
    reservation.save()
    print(reservation)
    return JsonResponse({'message': 'Reservation made successfully!'}, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST', 'DELETE'])
def reservation_list(request):
    if request.method == 'GET':
        reservations = Reservation.objects.all()
        reservations_serializer = ReservationSerializer(reservations, many=True)
        return JsonResponse(reservations_serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        locuinta = Locuinta.objects.get(pk=data['locuinta_id'])
        user = User.objects.get(pk=data['user_id'])
        reservation = Reservation(user=user, locuinta=locuinta, date_time=data['date_time'])
        print(reservation)
        reservations_serializer = ReservationSerializer(data=reservation)
        if reservations_serializer.is_valid():
            reservations_serializer.save()
            return JsonResponse(reservations_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(reservations_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Reservation.objects.all().delete()
        return JsonResponse({'message': '{} Reservations were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def reservations_per_locuinta(request, locuinta_id):
    locuinta = Locuinta.objects.get(pk=locuinta_id)
    reservations = Reservation.objects.filter(locuinta=locuinta)

    if request.method == 'GET':
        reservation_serializer = ReservationSerializer(reservations, many=True)
        return JsonResponse(reservation_serializer.data, safe=False)


@api_view(['POST'])
def verify_available_reservation(request):
    locuinta_id = request.data['locuinta_id']
    date_time = request.data['date_time']

    locuinta = Locuinta.objects.get(pk=locuinta_id)
    reservations = Reservation.objects.filter(locuinta=locuinta, date_time=date_time)

    if request.method == 'POST':
        reservation_serializer = ReservationSerializer(reservations, many=True)
        return JsonResponse(reservation_serializer.data, safe=False)


@api_view(['POST'])
def reservations_active(request):
    user_id = request.data['user_id']
    locuinta_id = request.data['locuinta_id']
    date_time = request.data['date_time']

    date = datetime.fromisoformat(date_time)

    locuinta = Locuinta.objects.get(pk=locuinta_id)
    reservations = Reservation.objects.filter(locuinta=locuinta, date_time__date=date.date())

    if request.method == 'POST':
        reservation_serializer = ReservationSerializer(reservations, many=True)
        return JsonResponse(reservation_serializer.data, safe=False)


@api_view(['POST'])
def statistics(request):
    locuinta_id = request.data['locuinta_id']
    date_time = request.data['date_time']

    date = datetime.fromisoformat(date_time)

    locuinta = Locuinta.objects.get(pk=locuinta_id)
    reservations = Reservation.objects.filter(locuinta=locuinta, date_time__date__year=date.date().year,
                                              date_time__date__month=date.date().month)

    if request.method == 'POST':
        reservation_serializer = ReservationSerializer(reservations, many=True)
        return JsonResponse(reservation_serializer.data, safe=False)