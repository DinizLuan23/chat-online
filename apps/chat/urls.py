from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('create-room', views.create_room, name='create_room'),
    path('<int:room_id>', views.room_detail, name='room_detail'),
    path('<int:room_id>/send', views.send_message, name='send_message'),
]
