let dbProductos = {
    "productos": [
    { "nombre": "Pollo con chanpignones", "imgRuta": "./img/platos/polloCChampignones.jpg", "precio": 999.56, "tipo":"carnivoro" },
    { "nombre": "Pollo y Vegetales", "imgRuta": "./img/platos/polloyvegetales.jpeg", "precio": 150.56, "tipo":"carnivoro" },
    { "nombre": "Bife Rustico", "imgRuta": "./img/platos/bifeRustico.jpg", "precio": 1150.56, "tipo":"carnivoro" },
    { "nombre": "Ensalada Rissiotti", "imgRuta": "./img/platos/ensaladaRissiotti.jpg", "precio": 950.56, "tipo":"vegano" },
    { "nombre": "Dulcecito", "imgRuta": "./img/platos/dulcecito.jpg", "precio": 150.56, "tipo":"vegetariano" },
    { "nombre": "Gringo Fest!", "imgRuta": "./img/platos/gringoFest.jpg", "precio": 850.56, "tipo":"carnivoro" },
    { "nombre": "Asian Fest!", "imgRuta": "./img/platos/asianfest.jpg", "precio": 750.56, "tipo":"carnivoro" },
    { "nombre": "Veggie Crunch!", "imgRuta": "./img/platos/VeggieCrunch.jpg", "precio": 550.56, "tipo":"vegano" },
    { "nombre": "Madrid Potato", "imgRuta": "./img/platos/madrid.webp", "precio": 1150.56, "tipo":"vegetariano" },
    { "nombre": "Con Sabor a Poco!", "imgRuta": "./img/platos/saborPoco.jpeg", "precio": 2150.56, "tipo":"carnivoro" },
    { "nombre": "Le ponemos de todo!", "imgRuta": "./img/platos/leponemodetodo.jpeg", "precio": 3850.56, "tipo":"carnivoro" },
    { "nombre": "Italianita", "imgRuta": "./img/platos/italianita.jpg", "precio": 4150.56, "tipo":"vegetariana" },
    { "nombre": "Criollo", "imgRuta": "./img/platos/criollo.webp", "precio": 9150.56, "tipo":"carnivoro" },
    { "nombre": "Finolli", "imgRuta": "./img/platos/finoli.jpeg", "precio": 11150.56, "tipo":"carnivoro" },
    { "nombre": "Ay mi colesterol!", "imgRuta": "./img/platos/burguer.jpeg", "precio": 450.56, "tipo":"carnivoro" },
    { "nombre": "La Linda", "imgRuta": "./img/platos/lalinda.jpeg", "precio": 250.56, "tipo":"carnivoro" }
    ]
    };






let platosPorHoja = 8;

let platosFiltrados;
let filtrado = false;
let filtroAnterior = "";


function mostrarElementos (platos){
    let topePlatos = platos.length;
    let topeFor;
    let botones = parseInt(topePlatos/8);
    if (getComputedStyle(document.body).getPropertyValue('--plataforma') === "celulares") {
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
        document.getElementById('contenedorProducto123').innerHTML +=  "<div class=\"producto producto"+ numero + "\"><div class=\"nombre\"><h2 class=\"nProducto\">" + platos[i].nombre + "</h2>" +
        "</div><div class=\"imagenProducto\"><img src=\"" + platos[i].imgRuta + "\" alt=\"" + platos[i].nombre + "\" class=\"imgPlato\">"+
        "</div><div class=\"precioProducto\"><h4 class=\"pProducto\">$" + platos[i].precio + "</h4></div><div class=\"pedirProducto\"><button type=\"button\" class=\"btnPedir\" onclick=\"agregarYSalvarPedido(" + dbProductos.productos.indexOf(platos[i]) + ")\">"+
        "Pedir!</button></div></div>";
    }

}

function renderizar(){
    mostrarElementos(dbProductos.productos);
    cargoPedido();
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
        document.getElementById('contenedorProducto123').innerHTML +=  "<div class=\"producto producto"+ numero + "\"><div class=\"nombre\"><h2 class=\"nProducto\">" + objetos[i].nombre + "</h2>" +
        "</div><div class=\"imagenProducto\"><img src=\"" + objetos[i].imgRuta + "\" alt=\"" + objetos[i].nombre + "\" class=\"imgPlato\">"+
        "</div><div class=\"precioProducto\"><h4 class=\"pProducto\">$" + objetos[i].precio + "</h4></div><div class=\"pedirProducto\"><button type=\"button\" class=\"btnPedir\" onclick=\"agregarYSalvarPedido(" + i + ")\">"+
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