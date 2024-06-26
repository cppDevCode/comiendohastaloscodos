let btnMenu = document.getElementById('btnMenu');
let btnHome = document.getElementById('btnHome');
let btnFranquicias = document.getElementById('btnFranquicia');
let btnLogin = document.getElementById('btnLogin');
let linkInvitado = document.getElementById('ingresarInvitado');
let btnReservar = document.getElementById('btnReservar');
let btnDelivery = document.getElementById('btnDelivery');
let txtUsuario = document.getElementById('usuario');
let txtContrasena = document.getElementById('contrasena');

const uriLogin = 'http://127.0.0.1:5000/loguear';
const opciones = {
        method: 'GET', 
        headers: {
            accept: 'application/json'
            }
        }


btnDelivery.onclick = function() {
    location.href = './market.html'
}

btnReservar.onclick = function(){
    location.href='./reserva.html'
}

btnMenu.onclick = function(){
    location.href='./index.html#menuResto';
}

btnHome.onclick = function() {
    location.href='./index.html';
}

btnFranquicias.onclick = function(){
    location.href='./index.html#dondeEncontrarnos'
}

btnLogin.onclick = async function() {
    json1 = new Object()
    json1.usuario = document.getElementById('usuario').value;
    json1.contrasena = document.getElementById('contrasena').value;
    cadenaJSON = JSON.stringify(json1);
    try {
        const response = await fetch(uriLogin, {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          body: cadenaJSON,
        });
        dato = await response.json();
      } catch (e) {
        console.error(e);
      }
      if (dato.usuario == undefined) {
        alert('Usuario/Contraseña Incorrecta')
      } 
      else {
        document.getElementById('ingresar').innerText = "⛵ " + dato.usuario//document.getElementById('usuario').value;
        modal.style.display = "none";
      }
    
}

linkInvitado.onclick = function() {
    document.getElementById('ingresar').innerText = "⛵ Invitado";
    modal.style.display = "none";
}

