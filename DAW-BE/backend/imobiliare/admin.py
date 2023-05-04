from django.contrib import admin

# Register your models here.
from imobiliare.models import Locuinta, Reservation

admin.site.register(Locuinta)
admin.site.register(Reservation)
