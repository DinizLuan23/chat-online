import json
from django.shortcuts import render
from django.views.generic.detail import DetailView

from .models import Message, Room

def home(req):
   rooms = Room.objects.all()
   return render(req, 'chat/home.html', { 'rooms': rooms })

class RoomDetailView(DetailView):
   model = Room
   template_name = 'chat/message-list.html'

   def get_context_data(self, **kwargs):
      context = super().get_context_data(**kwargs)
      return context

def send_message(req, pk):
   data = json.loads(req.body)
   new_message = Message.objects.create(user = req.user, text=data['message'])
   return render(req, 'chat/message.html', { 'message': new_message })