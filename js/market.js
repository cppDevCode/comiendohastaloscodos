const urlServer = 'http://127.0.0.1:5000/platos?traertodos=1'
const urlPrecios = 'http://127.0.0.1:5000/precios?traertodos=1'

let platos


let dbProductos = {
    "productos": []
};

let prod = []






let platosPorHoja = 8;

let platosFiltrados;
let filtrado = false;
let filtroAnterior = "";

function btnMenosCantidad(id) { 
    let cantidad = parseInt(id.innerHTML);
    cantidad -= 1;
    if (cantidad > 0) {
        id.innerHTML = cantidad;
    }
}

function btnMasCantidad(id) { 
    let cantidad = parseInt(id.innerHTML);
    cantidad = parseInt(cantidad) + 1;
    if (cantidad > 0) {
        id.innerHTML = cantidad;
    }
}

function mostrarElementos (platos){
    let topePlatos = platos.length;
    let topeFor;
    let botones = parseInt(topePlatos/8);
    if (getComputedStyle(document.body).getPropertyValue('--plataforma') === "celulares" || getComputedStyle(document.body).getPropertyValue('--plataforma') === "tablet") {
        platosPorHoja = 4;
        botones = parseInt(topePlatos/4);
    } 
    
    if (botones != 0){
        for (let i = 0; i< botones; i++) {
            document.getElementById('botonera').innerHTML += "<button type=\"button\"  class=\"btnPlatos\" id=\"btn" + i + "\" onclick=\"mostrarPlatos(" + i +")\">" + (i + 1) + "</button>"
        }
    }
    
    if (platos.length < platosPorHoja) {
        topeFor = platos.length;
    } else {
        topeFor = platosPorHoja;
    }
    for (let i = 0; i < topeFor;i++){
        let numero = parseInt(i)+1;
        document.getElementById('contenedorProducto123').innerHTML +=  "<div class=\"producto producto" + numero + "\"><div class=\"nombre\"><h2 class=\"nProducto\">" + platos[i].nombre + "</h2>" +
        "</div><div class=\"imagenProducto\"><img src=\"" + platos[i].imgRuta + "\" alt=\"" + platos[i].nombre + "\" class=\"imgPlato\">"+
        "</div><div class=\"precioProducto\"><h4 class=\"pProducto\">$" + platos[i].precio + "</h4></div><div class=\"cantidadProducto\"><button type=\"button\" class=\"btnCantidadProducto\" id=\"btnMenos\" onclick=\"btnMenosCantidad(" + "labCantidad" + String(i) + ")\">-</button><h4 id=\"labCantidad" + String(i) + "\" class=\"cantLabel\">1</h4><button type=\"button\" id=\"btnMas\" class=\"btnCantidadProducto\" onclick=\"btnMasCantidad(" + "labCantidad" + String(i) + ")\">+</button></div><div class=\"pedirProducto\"><button type=\"button\" class=\"btnPedir\" onclick=\"agregarYSalvarPedido(" + dbProductos.productos.indexOf(platos[i]) + "," + i + ")\">"+
        "Pedir!</button></div></div>";
    }

}

async function renderizar(){
    let precios = [];
    let usuario = sessionStorage.getItem("usuario");
    const btnIngresar = document.getElementById('ingresar');

    if (usuario != null){
        document.getElementById('ingresar').innerText = "⛵ " + usuario
        document.getElementById('CerrarSesion').style.opacity=1
        btnIngresar.disabled = true;
    } else {
        document.getElementById('CerrarSesion').style.opacity=0
        btnIngresar.disabled = false;
    }
    await fetch(urlServer)
    .then((res) => res.json())
    .then((data) => 
            { 
                for (let a=0; a< data.length;a++){
                    prod.push(data[a])
                }
            });
    dbProductos.productos = prod
    await fetch(urlPrecios)
    .then((res) => res.json())
    .then ((data) => 
        {
            for (let a=0; a< data.length;a++){
                precios.push(data[a])
            }
        }
    )
    for (let a=0; a < dbProductos.productos.length;a++ ) {
        if (precios[a] != undefined) {
            dbProductos.productos[a].precio = precios[a].precio
        }
    }
    mostrarElementos(dbProductos.productos);
    cargoPedido(dbProductos);
    filtrado = false;
    }


function mostrarElementosPorRango(objetos,numPlato){
    let topeFor = (numPlato+1)*platosPorHoja;
    let inicioFor = 0;

    if (numPlato != 0) {
        inicioFor = numPlato*platosPorHoja;
    }

    document.getElementById('contenedorProducto123').innerHTML = "";
    let numero = 1;
    for (let i = inicioFor; i < topeFor;i++){
        document.getElementById('contenedorProducto123').innerHTML += "<div class=\"producto producto" + numero + "\"><div class=\"nombre\"><h2 class=\"nProducto\">" + objetos[i].nombre + "</h2>" +
        "</div><div class=\"imagenProducto\"><img src=\"" + objetos[i].imgRuta + "\" alt=\"" + objetos[i].nombre + "\" class=\"imgPlato\">"+
        "</div><div class=\"precioProducto\"><h4 class=\"pProducto\">$" + objetos[i].precio + "</h4></div><div class=\"cantidadProducto\"><button type=\"button\" class=\"btnCantidadProducto\" id=\"btnMenos\" onclick=\"btnMenosCantidad(" + "labCantidad" + String(i) + ")\">-</button><h4 id=\"labCantidad" + String(i) + "\" class=\"cantLabel\">1</h4><button type=\"button\" id=\"btnMas\" class=\"btnCantidadProducto\" onclick=\"btnMasCantidad(" + "labCantidad" + String(i) + ")\">+</button></div><div class=\"pedirProducto\"><button type=\"button\" class=\"btnPedir\" onclick=\"agregarYSalvarPedido(" + dbProductos.productos.indexOf(objetos[i]) + "," + i + ")\">"+
        "Pedir!</button></div></div>";
         
        numero++;
    }
}

function mostrarPlatos(numPlato){
    if (filtrado){
        mostrarElementosPorRango(platosFiltrados,numPlato);
    } else {
        mostrarElementosPorRango(dbProductos.productos,numPlato);
    }
}


function filtrarPlatos (tipoComida){
    document.getElementById('contenedorProducto123').innerHTML = "";
    document.getElementById('botonera').innerHTML = "";
    if (filtrado & tipoComida === filtroAnterior) {
        filtrado = false;
        document.getElementById(filtroAnterior).style.backgroundColor = "";
        filtroAnterior = ""
        mostrarElementos(dbProductos.productos);
    } else {
        platosFiltrados = dbProductos.productos.filter(producto => producto.tipo === tipoComida);
        if (platosFiltrados.length != 0) {
            filtrado = true;
            document.getElementById(tipoComida).style.backgroundColor = 'white';
            if (filtroAnterior.length > 0) {
                console.log(filtroAnterior);
                document.getElementById(filtroAnterior).style.backgroundColor = "";
            }
            document.getElementById(tipoComida).style.backgroundColor = 'white';
            filtroAnterior = tipoComida;
            mostrarElementos(platosFiltrados);
        }
    }
}

function btnBuscarClick(){
    textoBuscado = document.getElementById('buscador');
    document.getElementById('contenedorProducto123').innerHTML = "";
    document.getElementById('botonera').innerHTML = "";
    encontrados = dbProductos.productos.filter(producto => (producto.nombre.toLowerCase().search(textoBuscado.value.toLowerCase()) != -1));
    mostrarElementos(encontrados);
}

function buscarEnter(event) {
    if (event.keyCode == 13) {
        btnBuscarClick();
    }
}
