let btnMenu = document.getElementById('btnMenu');
let btnHome = document.getElementById('btnHome');
let btnFranquicias = document.getElementById('btnFranquicia');
let btnLogin = document.getElementById('btnLogin');
let linkInvitado = document.getElementById('ingresarInvitado');
let btnReservar = document.getElementById('btnReservar');
let btnDelivery = document.getElementById('btnDelivery');
let txtUsuario = document.getElementById('usuario');
let txtContrasena = document.getElementById('contrasena');
let btnCerrarSesion = document.getElementById('CerrarSesion')

const uriLogin = 'http://127.0.0.1:5000/loguear';
const opciones = {
        method: 'GET', 
        headers: {
            accept: 'application/json'
            }
        }

btnCerrarSesion.onclick = function() {
  const btnIngresar = document.getElementById('ingresar');
  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("id");
  document.getElementById("ingresar").innerHTML = '<i class="fa-solid fa-circle-user"></i> Ingresar';
  document.getElementById('CerrarSesion').style.opacity=0
  btnIngresar.disabled = false;
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
    const btnIngresar = document.getElementById('ingresar');
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
        sessionStorage.setItem("usuario",dato.usuario)
        sessionStorage.setItem("id",dato.id)
        document.getElementById('ingresar').innerText = "⛵ " + dato.usuario//document.getElementById('usuario').value;
        btnIngresar.disabled=true;
        document.getElementById('CerrarSesion').style.opacity=1
        modal.style.display = "none";
      }
    
}

linkInvitado.onclick = function() {
    document.getElementById('ingresar').innerText = "⛵ Invitado";
    modal.style.display = "none";
}

