const chatMessages = document.querySelector('.messages');

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
}

const sendMessage = async (data) => {
   const response = await instance(`/${data.room_id}/send`, 'POST', 'application/json', data.csrfmiddlewaretoken, data)
   const html = await response.text();

   const containerMessage = document.querySelector('.container-message');
   containerMessage.insertAdjacentHTML('beforeend', html);

   Qs('.send-message').reset();
}

const createRoom = async (data) => {
   const response = await instance('/create-room', 'POST', 'application/json', data.csrfmiddlewaretoken, data)
   const html = await response.text();

   const listRooms = document.querySelector('.list-rooms');
   listRooms.insertAdjacentHTML('afterbegin', html);

   const modal = bootstrap.Modal.getInstance(Qs('.modal'))

   modal.hide();
   Qs('.create-room').reset();
   getLastRoom();
}

const getLastRoom = () => Qs('.list-rooms li').click();

// EVENTS

// Intercept form send-message
Qs('.send-message').addEventListener('submit', (e) => {
   e.preventDefault();
   const data = Object.fromEntries(new FormData(e.target).entries())
   sendMessage(data);
})

// Intercept form create-room
Qs('.create-room').addEventListener('submit', (e) => {
   e.preventDefault();
   const data = Object.fromEntries(new FormData(e.target).entries())
   createRoom(data);
})

// INIT
getLastRoom();