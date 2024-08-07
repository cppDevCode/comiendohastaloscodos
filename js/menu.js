let btnMenu = document.getElementById('btnMenu');
let btnHome = document.getElementById('btnHome');
let btnFranquicias = document.getElementById('btnFranquicia');
let btnLogin = document.getElementById('btnLogin');
let linkInvitado = document.getElementById('ingresarInvitado');
let btnReservar = document.getElementById('btnReservar');
let btnDelivery = document.getElementById('btnDelivery');
let txtUsuario = document.getElementById('usuario');
let txtContrasena = document.getElementById('contrasena');
let btnConfiguracion = document.getElementById('configuracionMenu');
let btnCerrarSesion = document.getElementById('CerrarSesion');
let btnGestionPlatos = document.getElementById('verReservas');
let btnEditarPlatos = document.getElementById('editarPlatos')

const uriLogin = 'https://pascalizado.pythonanywhere.com/loguear';
const uriEsAdmin = 'https://pascalizado.pythonanywhere.com/cliente?esadmin='
const opciones = {
        method: 'GET', 
        headers: {
            accept: 'application/json'
            }
        }


btnEditarPlatos.onclick = function() {
  location.href = './platos.html'
}

btnConfiguracion.onclick = function(){
  location.href = './configuracion.html';
}

btnCerrarSesion.onclick = function() {
  const btnIngresar = document.getElementById('ingresar');
  const menuDesplegable = document.getElementById('menuDesplegable');
  const btnMenuDesplegable = document.getElementById('btnMenuDesplegable');

  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("id");
  menuDesplegable.style.visibility = 'hidden';
  btnIngresar.hidden = false;
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
    const menuDesplegable = document.getElementById('menuDesplegable');
    const btnMenuDesplegable = document.getElementById('btnMenuDesplegable');
    

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
        menuDesplegable.style.visibility = 'visible';
        let esAdmin;
        await fetch(uriEsAdmin + dato.id)
        .then ((res) => res.json())
        .then ((data) => esAdmin = data["esAdmin"])
        if (esAdmin == 0){
          editarPlatos.style.visibility = 'hidden';
        } else {
          editarPlatos.style.visibility = 'visible';
        }
        btnMenuDesplegable.innerText  = "⛵ " + dato.usuario
        btnIngresar.hidden = true;
        modal.style.display = "none";
      }
    
}

linkInvitado.onclick = function() {
    document.getElementById('ingresar').innerText = "⛵ Invitado";
    modal.style.display = "none";
}

