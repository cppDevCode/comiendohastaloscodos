let btnMenu = document.getElementById('btnMenu');
let btnHome = document.getElementById('btnHome');
let btnFranquicias = document.getElementById('btnFranquicia');
let btnLogin = document.getElementById('btnLogin');

btnMenu.onclick = function(){
    location.href='#menuResto';
}

btnHome.onclick = function() {
    location.href='./index.html';
}

btnFranquicias.onclick = function(){
    location.href='#dondeEncontrarnos'
}

btnLogin.onclick = function() {
    document.getElementById('ingresar').innerText = "⛵ " + document.getElementById('usuario').value;
    modal.style.display = "none";
}

