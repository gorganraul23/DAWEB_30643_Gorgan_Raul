from rest_framework import serializers
from imobiliare.models import Locuinta, Reservation


class LocuintaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Locuinta
        fields = ('id',
                  'transaction_type',
                  'type',
                  'description',
                  'price',
                  'square_meters',
                  'floor',
                  'rooms',
                  'city',
                  'zone',
                  'date_added',
                  'img_path',
                  'user_id'
                  )


class ReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = ('id',
                  'user',
                  'locuinta',
                  'date_time'
                  )


class ReservationWithNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = ('id',
                  'user',
                  'locuinta',
                  'date_time',
                  'username'
                  )

