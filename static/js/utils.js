const Qs = (el) => document.querySelector(el);
const QsAll = (el) => document.querySelectorAll(el);

const instance = async (route, method, type, csrf, data) => {
   if(type == 'GET') {
      return await fetch(route)
   }else{
      let auxBody = {
         method,
         headers: {
            'Content-Type': type
         },
         body: JSON.stringify(data)
      }

      if(csrf) auxBody.headers['X-CSRFToken'] = csrf;

      return await fetch(route, auxBody)
   }
}

const getCookie = (nome) => {
   // Separe todos os cookies
   const cookies = document.cookie.split(';');
   
   // Procure o cookie com a chave especificada
   for (let i = 0; i < cookies.length; i++) {
       const cookie = cookies[i].trim();
       // Verifique se o cookie começa com o nome especificado
       if (cookie.startsWith(nome + '=')) {
           // Se sim, retorne o valor do cookie
           return cookie.substring(nome.length + 1);
       }
   }
   
   // Se o cookie não for encontrado, retorne null
   return null;
}