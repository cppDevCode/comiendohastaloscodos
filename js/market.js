let dbProductos = {
    "productos": [
    { "nombre": "Pollo con chanpignones", "descripcion": " Plato de pollo cocinado con champiñones frescos, sazonado y cocido a la perfección para un sabor delicioso y una textura suculenta.","imgRuta": "./img/platos/polloCChampignones.jpg", "precio": 999.56, "tipo":"carnivoro" },
    { "nombre": "Pollo y Vegetales", "descripcion":"Plato de pollo acompañado de una variedad de vegetales frescos, cocinados al punto para resaltar sus sabores naturales y crear un plato nutritivo y satisfactorio.", "imgRuta": "./img/platos/polloyvegetales.jpeg", "precio": 150.56, "tipo":"carnivoro" },
    { "nombre": "Bife Rustico", "descripcion":"Jugoso corte de carne asada, sazonado con hierbas y especias, con un toque de rusticidad que resalta su sabor auténtico y su textura tierna.","imgRuta": "./img/platos/bifeRustico.jpg", "precio": 1150.56, "tipo":"carnivoro" },
    { "nombre": "Ensalada Rissiotti", "descripcion":"Mezcla fresca de rúcula, tomates cherry, queso parmesano y vinagreta balsámica, ofreciendo un sabor equilibrado y una experiencia refrescante.", "imgRuta": "./img/platos/ensaladaRissiotti.jpg", "precio": 950.56, "tipo":"vegano" },
    { "nombre": "Dulcecito", "descripcion":"Mezcla fresca de rúcula, tomates cherry, queso parmesano y vinagreta balsámica, ofreciendo un sabor equilibrado y una experiencia refrescante.", "imgRuta": "./img/platos/dulcecito.jpg", "precio": 150.56, "tipo":"vegetariano" },
    { "nombre": "Gringo Fest!", "descripcion":"Mezcla fresca de rúcula, tomates cherry, queso parmesano y vinagreta balsámica, ofreciendo un sabor equilibrado y una experiencia refrescante.","imgRuta": "./img/platos/gringoFest.jpg", "precio": 850.56, "tipo":"carnivoro" },
    { "nombre": "Asian Fest!","descripcion":"Mezcla fresca de rúcula, tomates cherry, queso parmesano y vinagreta balsámica, ofreciendo un sabor equilibrado y una experiencia refrescante.", "imgRuta": "./img/platos/asianfest.jpg", "precio": 750.56, "tipo":"carnivoro" },
    { "nombre": "Veggie Crunch!","descripcion":"Mezcla fresca de rúcula, tomates cherry, queso parmesano y vinagreta balsámica, ofreciendo un sabor equilibrado y una experiencia refrescante.", "imgRuta": "./img/platos/VeggieCrunch.jpg", "precio": 550.56, "tipo":"vegano" },
    { "nombre": "Madrid Potato","descripcion":"Mezcla fresca de rúcula, tomates cherry, queso parmesano y vinagreta balsámica, ofreciendo un sabor equilibrado y una experiencia refrescante.","imgRuta": "./img/platos/madrid.webp", "precio": 1150.56, "tipo":"vegetariano" },
    { "nombre": "Con Sabor a Poco!","descripcion":"Mezcla fresca de rúcula, tomates cherry, queso parmesano y vinagreta balsámica, ofreciendo un sabor equilibrado y una experiencia refrescante.", "imgRuta": "./img/platos/saborPoco.jpeg", "precio": 2150.56, "tipo":"carnivoro" },
    { "nombre": "Le ponemos de todo!","descripcion":"Mezcla fresca de rúcula, tomates cherry, queso parmesano y vinagreta balsámica, ofreciendo un sabor equilibrado y una experiencia refrescante.", "imgRuta": "./img/platos/leponemodetodo.jpeg", "precio": 3850.56, "tipo":"carnivoro" },
    { "nombre": "Italianita","descripcion":"Mezcla fresca de rúcula, tomates cherry, queso parmesano y vinagreta balsámica, ofreciendo un sabor equilibrado y una experiencia refrescante.", "imgRuta": "./img/platos/italianita.jpg", "precio": 4150.56, "tipo":"vegetariana" },
    { "nombre": "Criollo","descripcion":"Mezcla fresca de rúcula, tomates cherry, queso parmesano y vinagreta balsámica, ofreciendo un sabor equilibrado y una experiencia refrescante.", "imgRuta": "./img/platos/criollo.webp", "precio": 9150.56, "tipo":"carnivoro" },
    { "nombre": "Finolli","descripcion":"Mezcla fresca de rúcula, tomates cherry, queso parmesano y vinagreta balsámica, ofreciendo un sabor equilibrado y una experiencia refrescante.", "imgRuta": "./img/platos/finoli.jpeg", "precio": 11150.56, "tipo":"carnivoro" },
    { "nombre": "Ay mi colesterol!","descripcion":"Mezcla fresca de rúcula, tomates cherry, queso parmesano y vinagreta balsámica, ofreciendo un sabor equilibrado y una experiencia refrescante.", "imgRuta": "./img/platos/burguer.jpeg", "precio": 450.56, "tipo":"carnivoro" },
    { "nombre": "La Linda","descripcion":"Mezcla fresca de rúcula, tomates cherry, queso parmesano y vinagreta balsámica, ofreciendo un sabor equilibrado y una experiencia refrescante.", "imgRuta": "./img/platos/lalinda.jpeg", "precio": 250.56, "tipo":"carnivoro" }
    ]
    };






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
