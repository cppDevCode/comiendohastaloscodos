let numPlatoActual = 0;
let ultimoPlato = dbProductos.productos.length-1;

function cambiarPlato (nombrePlato){
    
    let platos = dbProductos.productos
    

    document.getElementById("imgPlatos").src= platos[nombrePlato].imgRuta;
    document.getElementById("platoTitulo").innerHTML =  platos[nombrePlato].nombre;
    document.getElementById("platoTitulo").className += "SedanFuente";

    
    switch (nombrePlato){
        case 0:
        document.getElementById('imgAnterior').style.opacity = 0;
        document.getElementById('imgPost').style.opacity = 0.3;
        document.getElementById("imgPost").src= platos[nombrePlato + 1].imgRuta;
        break;
       
        case ultimoPlato:
            document.getElementById('imgAnterior').style.opacity = 0.3;
            document.getElementById('imgPost').style.opacity = 0;
            document.getElementById("imgAnterior").src= platos[nombrePlato - 1].imgRuta;
            break;
        
        default:
            document.getElementById('imgAnterior').style.opacity = 0.3;
            document.getElementById('imgPost').style.opacity = 0.3;
            document.getElementById("imgAnterior").src= platos[nombrePlato - 1].imgRuta;
            document.getElementById("imgPost").src= platos[nombrePlato + 1 ].imgRuta;
            break;
    }

    numPlatoActual = nombrePlato;
}
function datoPlato(){
    document.getElementById("imgPlatos").src= dbProductos.productos[numPlatoActual].imgRuta;
    document.getElementById("platoTitulo").innerHTML =  dbProductos.productos[numPlatoActual].nombre;
    document.getElementById("platoSub").innerHTML = dbProductos.productos[numPlatoActual].descripcion;
    document.getElementById("platoTitulo").className += "SedanFuente";

}

let botonAnterior = 0;

function clickbtnCarrusel(id){
    document.getElementById(botonAnterior).style.borderColor = 'black';
    document.getElementById(id).style.borderColor = 'white';
}

function siguientePlato (){
    if ((numPlatoActual+1) < ultimoPlato){
        cambiarPlato(numPlatoActual + 1);
        botonAnterior = "botonCarrusel" + (numPlatoActual-1)
        plato = "botonCarrusel" + (numPlatoActual);
        clickbtnCarrusel(plato);
    }
}

function platoAnterior (){
    if ((numPlatoActual - 1) > -1) {
        cambiarPlato(numPlatoActual - 1);
        botonAnterior = "botonCarrusel" + (numPlatoActual+1)
        plato = "botonCarrusel" + (numPlatoActual);
        clickbtnCarrusel(plato);
    }
}

function agregarBotoneraCarrusel(){
    for (i= 0;i < dbProductos.productos.length;i++){
        document.getElementById("botoneraCarrusel").innerHTML += `<button onclick="cambiarPlato(`+ i +`)"  type="button" id="botonCarrusel` + i + `"></button>`
    }
    document.getElementById("imgPlatos").src= dbProductos.productos[0].imgRuta;
}