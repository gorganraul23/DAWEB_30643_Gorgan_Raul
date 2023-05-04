from django.urls import path

from users.views import users_list, users_detail

urlpatterns = [
    path('', users_list, name="users_list"),
    path('<int:id>/', users_detail, name="users_details"),
]
