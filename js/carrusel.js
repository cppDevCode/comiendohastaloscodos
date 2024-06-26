const urlServer1 = 'http://127.0.0.1:5000/platos?traertodos=1'

let numPlatoActual = 0;
let dbProductos1 = {
    "productos": []
};

let ultimoPlato = 0;
let botonAnterior = "botonCarrusel0";

function cambiarPlato (nombrePlato){
    
    let platos1 = dbProductos1.productos;
    
    
    document.getElementById("imgPlatos").src= platos1[nombrePlato].imgRuta;
    document.getElementById("platoTitulo").innerHTML =  platos1[nombrePlato].nombre;
    document.getElementById("platoTitulo").className += "SedanFuente";
    if ((getComputedStyle(document.body).getPropertyValue('--plataforma') != "celulares") & (getComputedStyle(document.body).getPropertyValue('--plataforma') != "tablet")){
        document.getElementById("botonCarrusel" + numPlatoActual).style.borderColor = 'black';
    }
    switch (nombrePlato){
        case 0:
        document.getElementById('imgAnterior').style.opacity = 0;
        document.getElementById('imgPost').style.opacity = 0.4;
        document.getElementById("imgPost").src= platos1[nombrePlato + 1].imgRuta;
        break;
       
        case ultimoPlato:
            document.getElementById('imgAnterior').style.opacity = 0.4;
            document.getElementById('imgPost').style.opacity = 0;
            document.getElementById("imgAnterior").src= platos1[nombrePlato - 1].imgRuta;
            break;
        
        default:
            document.getElementById('imgAnterior').style.opacity = 0.4;
            document.getElementById('imgPost').style.opacity = 0.4;
            document.getElementById("imgAnterior").src= platos1[nombrePlato - 1].imgRuta;
            document.getElementById("imgPost").src= platos1[nombrePlato + 1 ].imgRuta;
            break;
    }

    numPlatoActual = nombrePlato;
}
function datoPlato(){
    console.log(dbProductos1.productos)
    document.getElementById("imgPlatos").src= dbProductos1.productos[numPlatoActual].imgRuta;
    document.getElementById("platoTitulo").innerHTML =  dbProductos1.productos[numPlatoActual].nombre;
    document.getElementById("platoSub").innerHTML = dbProductos1.productos[numPlatoActual].descripcion;
    document.getElementById("platoTitulo").className += "SedanFuente";

}



function clickbtnCarrusel(id){
    if ((getComputedStyle(document.body).getPropertyValue('--plataforma') != "celulares") & (getComputedStyle(document.body).getPropertyValue('--plataforma') != "tablet")){
        document.getElementById(botonAnterior).style.borderColor = 'black';
        document.getElementById(id).style.borderColor = 'white';
    }
}

function siguientePlato (){
    if ((numPlatoActual+1) <= ultimoPlato){
        cambiarPlato(numPlatoActual + 1);
        if ((getComputedStyle(document.body).getPropertyValue('--plataforma') != "celulares") & (getComputedStyle(document.body).getPropertyValue('--plataforma') != "tablet")){
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

async function agregarBotoneraCarrusel(){
    let prod = []
    let usuario = sessionStorage.getItem("usuario")
    if (usuario != null){
        document.getElementById('ingresar').innerText = "⛵ " + usuario
        document.getElementById('CerrarSesion').style.opacity=1
    } else {
        document.getElementById('CerrarSesion').style.opacity=0
    }
    await fetch(urlServer1)
    .then((res) => res.json())
    .then(data =>
            {
                for (let a=0; a< data.length;a++){
                    prod.push(data[a])
                }
            }
    )

    dbProductos1.productos=prod
    ultimoPlato = dbProductos1.productos.length-1;
    if ((getComputedStyle(document.body).getPropertyValue('--plataforma') === "celulares")  || (getComputedStyle(document.body).getPropertyValue('--plataforma') === "tablet")){
       document.getElementsByClassName('imgAnteriorcarrusel')[0].innerHTML = `<button type="button" id="imgAnterior" onclick="platoAnterior()"><i class="fa-solid fa-circle-chevron-left"></i></button>`
       document.getElementById('imgAnterior').style.opacity = 0;
       document.getElementsByClassName("imgPostcarrusel")[0].innerHTML= `<button type="button" id="imgPost" onclick="siguientePlato()"><i class="fa-solid fa-circle-chevron-right"></i></button>`

    } else{
        for (i= 0;i < dbProductos1.productos.length;i++){
            document.getElementById("botoneraCarrusel").innerHTML += `<button onclick="cambiarPlato(`+ i +`)"  type="button" id="botonCarrusel` + i + `"></button>`
        }
        document.getElementById("botonCarrusel0").style.borderColor = 'white';
        document.getElementById("imgPlatos").src= dbProductos1.productos[0].imgRuta;
    }
}