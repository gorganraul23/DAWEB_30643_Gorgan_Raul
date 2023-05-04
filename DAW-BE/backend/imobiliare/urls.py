from django.urls import path

from imobiliare.views import locuinte_list, locuinte_detail, locuinte_list_by_type, locuinte_list_by_user, \
    locuinte_list_by_locuinta_type, locuinte_news, make_reservation, reservation_list, reservations_per_locuinta, \
    verify_available_reservation, reservations_active, statistics

urlpatterns = [
    path('', locuinte_list, name="locuinte_list"),
    path('<int:id>/', locuinte_detail, name="locuinte_detail"),
    path('type/<int:transaction_type>/<int:type>/', locuinte_list_by_type, name="locuinte_by_type"),
    path('type/<int:type>/', locuinte_list_by_locuinta_type, name="locuinte_by_locuinte_type"),
    path('proprietary/<int:user_id>/type/<int:type>/', locuinte_list_by_user, name="locuinte_list_by_user"),
    path('news/', locuinte_news, name="locuinte_news"),

    path('reservation/create/', make_reservation, name="make_reservation"),
    path('reservation/', reservation_list, name="reservation_list"),
    path('reservation/<int:locuinta_id>', reservations_per_locuinta, name="reservations_per_locuinta"),
    path('reservation/available/', verify_available_reservation, name="verify_available_reservation"),
    path('reservation/active/', reservations_active, name="reservations_active"),
    path('reservation/stats/', statistics, name="statistics"),
]
