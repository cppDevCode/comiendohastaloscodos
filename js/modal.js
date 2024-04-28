let modal = document.getElementById("modal1");
let carrito = document.getElementById("modalCarrito");
let btn = document.getElementById("ingresar");
let span = document.getElementsByClassName("cerrar")[0];
let btnCerrarRegistrar = document.getElementById('xCerrar');
let iUsuario = document.getElementById("usuario");
let btnCarrito = document.getElementById('btnCarrito');
let posicionMouse;

btn.onclick = function() {
    modal.style.display = "block";
    iUsuario.focus();
}

btnCarrito.onclick = function() {
        carrito.style.display = "block";
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
    } else if (event.target == carrito) {
        carrito.style.display = "none";
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

// CARRITO
