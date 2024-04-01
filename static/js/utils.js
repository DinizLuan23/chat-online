const Qs = (el) => document.querySelector(el);
const QsAll = (el) => document.querySelectorAll(el);

const instance = async (route, method, type, csrf, data) => {
   if(type == 'GET') {
      return await fetch(route)
   }else{
      return await fetch(route, {
         method,
         headers: {
            'Content-Type': type,
            'X-CSRFToken': csrf
         },
         body: JSON.stringify(data)
      })
   }
}