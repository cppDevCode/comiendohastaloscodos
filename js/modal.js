let modal = document.getElementById("modal1");
let btn = document.getElementById("ingresar");
let span = document.getElementsByClassName("cerrar")[0];
let btnCerrarRegistrar = document.getElementById('xCerrar');
let iUsuario = document.getElementById("usuario");
        
btn.onclick = function() {
    modal.style.display = "block";
    iUsuario.focus();
}
        
        
span.onclick = function() {
    modal.style.display = "none";
}

btnCerrarRegistrar.onclick = function() {
    modal.style.display = "none";
    document.getElementById('contenedorLogin').style.display='grid';
    document.getElementById('textoBienvenidaRegistro').style.display = 'block';
    document.getElementById('formularioRegistro').style.display = 'none';
    document.getElementById("registrar").style.height = "50vh";
    document.getElementById('xRegistrar').style.display='none';
}
        
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('contenedorLogin').style.display='grid';
        document.getElementById('textoBienvenidaRegistro').style.display = 'block';
        document.getElementById('formularioRegistro').style.display = 'none';
        document.getElementById("registrar").style.height = "50vh";
        document.getElementById('xRegistrar').style.display='none';
    }
}

var modalContactar = document.getElementById("modalContactar");
var btnContactar = document.getElementById("contactar");
var btnCerrar = document.getElementById("btnCerrar");

btnContactar.onclick = function() {
    modalContactar.style.display = "block";
}

btnCerrar.onclick = function() {
    modalContactar.style.display = "none";
}