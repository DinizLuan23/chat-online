const chatMessages = document.querySelector('.messages');

// Websocket
let chatSocket = {};

function handleRoomId(roomId) {
   chatSocket = new WebSocket(`ws://${window.location.host}/ws/${roomId}/`);

   chatSocket.onmessage = function(e) {
      const data = JSON.parse(e.data);
   
      const containerMessage = document.querySelector('.container-message');
      containerMessage.insertAdjacentHTML('beforeend', data.message);
   };
   
   chatSocket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
   };
}

const setRoomActive = (room_id) => {
   for (const el of QsAll('.list-rooms li')) el.classList.remove('active');
   Qs(`#room-${room_id}`).classList.add('active');

   Qs('#selected-room').value = room_id;
}

const getMessages = async (room_id) => {
   const response = await fetch(`/${room_id}`)
   const html = await response.text();
   chatMessages.innerHTML = html;

   setRoomActive(room_id);
   handleRoomId(room_id);
}

const getLastRoom = () => Qs('.list-rooms li')?.click();

const initPage = () => {
   const username = getCookie('username');
   if(!username){
      const modal = new bootstrap.Modal(Qs('#modalSelectUsername'))
      return modal.show();
   }
}

// INIT
getLastRoom();
initPage();

// EVENTS

// Intercept form send-message
Qs('.send-message')?.addEventListener('submit', async (e) => {
   e.preventDefault();
   const username = getCookie('username');

   const data = Object.fromEntries(new FormData(e.target).entries())

   const response = await instance(`/${data.room_id}/send`, 'POST', 'application/json', data.csrfmiddlewaretoken, {...data, username})
   const html = await response.text();

   if(html){
      chatSocket.send(JSON.stringify({ 'message': html }));
      Qs('.send-message').reset();
   }
})

// Intercept form create-room
Qs('.create-room')?.addEventListener('submit', async (e) => {
   e.preventDefault();
   const username = getCookie('username');

   const data = Object.fromEntries(new FormData(e.target).entries())

   const response = await instance('/create-room', 'POST', 'application/json', data.csrfmiddlewaretoken, {...data, username})
   const html = await response.text();

   const listRooms = document.querySelector('.list-rooms');
   listRooms.insertAdjacentHTML('afterbegin', html);

   const modal = new bootstrap.Modal(Qs('#modalCreateRoom'))
   modal.hide();

   Qs('.create-room').reset();
   getLastRoom();
})

// Intercept form select-name
Qs('.select-name')?.addEventListener('submit', async (e) => {
   const data = Object.fromEntries(new FormData(e.target).entries())
   document.cookie = 'username='+data.username;
})