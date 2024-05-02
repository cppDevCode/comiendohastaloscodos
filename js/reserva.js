let muestroNumero = document.getElementById('muestroNumero');
let btnMenosPersonas = document.getElementById('menosPersonas');
let btnMasPersonas = document.getElementById('masPersonas');
let comensalesDiv = document.getElementById('comensales');
let fechaReservaDiv = document.getElementById('fechaReserva'); 
let btnComensales = document.getElementById('btnComensales');
let btnSeleccionFecha = document.getElementById('btnSeleccionFecha');
let horarioDiv = document.getElementById('horario');
let calendario = document.getElementById('fecha');
let btnFecha = document.getElementById('btnFecha');
let btnUno = document.getElementById('btnUno');
let btnDos = document.getElementById('btnDos');
let btnTres = document.getElementById('btnTres');
let btnCuatro = document.getElementById('btnCuatro');
let btnAlmuerzoE = document.getElementById('btnAlmuerzoE');
let btnCena = document.getElementById('btnCena');
let btnAlmuerzo = document.getElementById('btnAlmuerzo');
let iconBtnAlmuerzo = btnAlmuerzo.innerHTML;
let iconBtnFecha = btnFecha.innerHTML;
let iconBtnComensales = btnComensales.innerHTML;

btnMasPersonas.onclick = function() {
    let numero = muestroNumero.innerHTML;
    numero = Number.parseInt(numero) + 1;
    muestroNumero.innerHTML = numero;
    btnMenosPersonas.removeAttribute("disabled");
}

btnMenosPersonas.onclick = function() {
    let numero = muestroNumero.innerHTML;
    numero = Number.parseInt(numero) - 1;
    if (numero === 5) {
        btnMenosPersonas.setAttribute("disabled","disabled");
    }
    if (numero != 4){
        muestroNumero.innerHTML = numero;
    } 
    
}

function voyAreserva(comensales) {
    comensalesDiv.style.display = "none";
    btnComensales.innerHTML = iconBtnComensales + " " + comensales;
    btnComensales.style.display = "flex";
    fechaReservaDiv.style.display = "block";
    fechaReservaDiv.style.textAlign = "center";
}

muestroNumero.onclick = function() {
    voyAreserva(muestroNumero.innerHTML)
}

btnSeleccionFecha.onclick = function() {
    if ( calendario.value != "" ) {
        horarioDiv.style.display = "flex";
        fechaReservaDiv.style.display = "none";
        btnFecha.style.display = "flex";
        btnFecha.innerHTML = iconBtnFecha + calendario.value;
    }
}

btnUno.onclick = function() {
    voyAreserva(1);
}

btnDos.onclick = function() {
    voyAreserva(2);
}

btnTres.onclick = function() {
    voyAreserva(3);
}

btnCuatro.onclick = function() {
    voyAreserva(4);
}


btnAlmuerzoE.onclick = function() {
    btnAlmuerzo.innerHTML = iconBtnAlmuerzo + "  " + btnAlmuerzoE.innerHTML;
    btnAlmuerzo.style.display = "flex";
    btn.onclick();
}

btnCena.onclick = function () {
    btnAlmuerzo.innerHTML = iconBtnAlmuerzo + "  Cena";
    btnAlmuerzo.style.display = "flex";
    btn.onclick();
}

btnFecha.onclick = function() {
    btnAlmuerzo.style.display = "none";
    horarioDiv.style.display = "none";
    fechaReservaDiv.style.display = "block";
}

btnComensales.onclick = function() {
    btnAlmuerzo.style.display = "none";
    horarioDiv.style.display = "none";
    fechaReservaDiv.style.display = "none";
    btnFecha.style.display = "none";
    fechaReservaDiv.style.display = "none";
    comensalesDiv.style.display = "grid";
    btnComensales.style.display = "none";
}