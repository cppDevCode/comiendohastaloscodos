let btnMenu = document.getElementById('btnMenu');
let btnHome = document.getElementById('btnHome');
let btnFranquicias = document.getElementById('btnFranquicia');
let btnLogin = document.getElementById('btnLogin');
let linkInvitado = document.getElementById('ingresarInvitado');
let btnReservar = document.getElementById('btnReservar');


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

btnLogin.onclick = function() {
    document.getElementById('ingresar').innerText = "⛵ " + document.getElementById('usuario').value;
    modal.style.display = "none";
}

linkInvitado.onclick = function() {
    document.getElementById('ingresar').innerText = "⛵ Invitado";
    modal.style.display = "none";
}

