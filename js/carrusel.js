let numPlatoActual = 0;
let ultimoPlato = dbProductos.productos.length-1;
let botonAnterior = "botonCarrusel0";

function cambiarPlato (nombrePlato){
    
    let platos = dbProductos.productos
    

    
    document.getElementById("imgPlatos").src= platos[nombrePlato].imgRuta;
    document.getElementById("platoTitulo").innerHTML =  platos[nombrePlato].nombre;
    document.getElementById("platoTitulo").className += "SedanFuente";
    if ((getComputedStyle(document.body).getPropertyValue('--plataforma') != "celulares") & (getComputedStyle(document.body).getPropertyValue('--plataforma') != "tablet")){
        document.getElementById("botonCarrusel" + numPlatoActual).style.borderColor = 'black';
    }
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



function clickbtnCarrusel(id){
    document.getElementById(botonAnterior).style.borderColor = 'black';
    document.getElementById(id).style.borderColor = 'white';
}

function siguientePlato (){
    if ((numPlatoActual+1) <= ultimoPlato){
        cambiarPlato(numPlatoActual + 1);
        if ((getComputedStyle(document.body).getPropertyValue('--plataforma') != "celulares") || (getComputedStyle(document.body).getPropertyValue('--plataforma') != "tablet")){
            botonAnterior = "botonCarrusel" + (numPlatoActual-1)
            plato = "botonCarrusel" + (numPlatoActual);
            clickbtnCarrusel(plato);
        }
       
    }
}

function platoAnterior (){
    if ((numPlatoActual - 1) > -1) {
        cambiarPlato(numPlatoActual - 1);

        if ((getComputedStyle(document.body).getPropertyValue('--plataforma') != "celulares") || (getComputedStyle(document.body).getPropertyValue('--plataforma') != "tablet")){
            botonAnterior = "botonCarrusel" + (numPlatoActual+1)
            plato = "botonCarrusel" + (numPlatoActual);
            clickbtnCarrusel(plato);
        }
        
    }
}

function agregarBotoneraCarrusel(){

    if ((getComputedStyle(document.body).getPropertyValue('--plataforma') === "celulares")  || (getComputedStyle(document.body).getPropertyValue('--plataforma') === "tablet")){
        console.log("entro")
       document.getElementsByClassName('imgAnteriorcarrusel')[0].innerHTML = `<button type="button" id="imgAnterior" onclick="platoAnterior()"><i class="fa-solid fa-circle-chevron-left"></i></button>`
       document.getElementsByClassName("imgPostcarrusel")[0].innerHTML= `<button type="button" id="imgPost" onclick="siguientePlato()"><i class="fa-solid fa-circle-chevron-left"></i></button>`


    }
    else{
    for (i= 0;i < dbProductos.productos.length;i++){
        document.getElementById("botoneraCarrusel").innerHTML += `<button onclick="cambiarPlato(`+ i +`)"  type="button" id="botonCarrusel` + i + `"></button>`
        }
        document.getElementById("botonCarrusel0").style.borderColor = 'white';
        document.getElementById("imgPlatos").src= dbProductos.productos[0].imgRuta;
    }
}