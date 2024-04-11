import json
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import Message, Room

@csrf_exempt
def home(req):
   username = req.COOKIES.get('username')
   rooms = Room.objects.all().order_by('-created_at')
   return render(req, 'chat/home.html', { 'rooms': rooms, 'username': username })

def room_detail(req, room_id):
   room = Room.objects.get(id=room_id)
   username = req.COOKIES.get('username')
   return render(req, 'chat/message-list.html', { 'rooms': room, 'username': username })

def send_message(req, room_id):
   data = json.loads(req.body)
   room = Room.objects.get(id=room_id)
   new_message = Message.objects.create(username = data['username'], text=data['message'])
   room.messages.add(new_message)
   
   return render(req, 'chat/message.html', { 'message': new_message, 'username': data['username'] })

def create_room(req):
   data = json.loads(req.body)
   room = Room.objects.create(user=data['username'], title=data['title'])
   
   return render(req, 'chat/room.html', { 'room': room, 'username': data['username'] })