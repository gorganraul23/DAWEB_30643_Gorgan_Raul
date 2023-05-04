from django.db import models
# Create your models here.
from users.models import User


class Locuinta(models.Model):
    transaction_types = (
        (1, "Vanzare"),
        (2, "Inchiriere"),
    )
    transaction_type = models.IntegerField(choices=transaction_types, default=1)

    types = (
        (1, "Garsoniera"),
        (2, "Apartament1"),
        (3, "Apartament2"),
        (4, "Apartament3"),
        (5, "Apartament4"),
        (6, "Casa"),
        (7, "Spatiu_birouri"),
        (8, "Spatiu_comercial"),
    )
    type = models.IntegerField(choices=types, default=1)

    description = models.CharField(max_length=200, blank=False, default='')
    price = models.IntegerField(blank=False, default=0)
    square_meters = models.IntegerField(blank=False, default=0)
    floor = models.CharField(max_length=2, blank=True, default='')
    rooms = models.CharField(max_length=2, blank=True, default='')
    city = models.CharField(max_length=20, blank=False, default='')
    zone = models.CharField(max_length=30, blank=False, default='')

    date_added = models.DateField(auto_now=True)
    img_path = models.CharField(max_length=100, blank=True, default='')
    user_id = models.IntegerField(blank=False, default=14)


class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    locuinta = models.ForeignKey(Locuinta, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
