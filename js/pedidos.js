let carritoPedido = new Array();
let valorTotal = 0;
let articulosTotales = 0;
let productoPedido;

/* FUNCIONES DEL CARRITO */

function cerrarClick(idElemento, plato, cantidad) {
    if (plato != undefined) {
        document.getElementById(idElemento).remove();
        articulosTotales = (articulosTotales - cantidad);
        document.getElementById("artCantidad").innerHTML = "Articulos en el carrito: " + articulosTotales;
        if (plato >= carritoPedido.length) {
            plato = (carritoPedido.length - plato);
        }
        if (carritoPedido[plato] == undefined) {
            document.getElementById("precio").innerHTML = "$ 0.00";
        } else {
            valorTotal -= (dbProductos.productos[carritoPedido[plato].plato].precio * cantidad)
            document.getElementById("precio").innerHTML = "$ " + (valorTotal).toFixed(2);
        }
        carritoPedido.splice(plato, 1);
        localStorage.removeItem("carrito");
        localStorage.setItem("carrito", JSON.stringify(carritoPedido));
    }

}

function agregarPedido(plato, p, cantidad,pedido) {
    document.getElementById("listaProductosAComprar").innerHTML += `<li class="liCarrito" id="liCarrito` + p + `">
                                    <div class="tarjetaProducto">
                                        <div class="imagenPlatoCarrito">
                                            <img class="imagenPlatoCarrito" src="` + pedido.productos[plato].imgRuta + `" alt="` + pedido.productos[plato].nombre + `">
                                        </div>
                                        <div class="nombrePlatoCarrito">
                                            <h4>`+ pedido.productos[plato].nombre + `</h4>
                                        </div>
                                        <div class="eliminarPlatoCarrito">
                                            <span class="cerrar" id="Cerrar` + plato + `" onclick="cerrarClick('liCarrito` + p + `',` + p + `,` + cantidad + `)"><i class="fa-regular fa-circle-xmark"></i></span>
                                        </div>
                                        <div class="valorPlatoCarrito">
                                            <h3>$ ` + (pedido.productos[plato].precio * cantidad) + `</h3>
                                        </div>
                                        <div class="cantidadPlatoCarrito">
                                            Cantidad: ` + cantidad + `
                                        </div>
                                    </div>
                                </li>`
    valorTotal += pedido.productos[plato].precio * cantidad;
    document.getElementById("precio").innerHTML = "$ " + valorTotal.toFixed(2);
}


/** Actualiza el número del carrito del header */
let cuenta = 0;
function actualizarNumeroCarrito() {
    let cuentaCarritoElement = document.getElementById("cuenta-carrito");
    let memoria = JSON.parse(localStorage.getItem("carrito"));
    if (memoria && memoria.length > 0) {
        cuenta = memoria.reduce((acum, current) => acum + parseInt(current.cantidad), 0)
        return cuentaCarritoElement.innerHTML = cuenta;
    }
    cuentaCarritoElement.innerText = 0;
}



function agregarYSalvarPedido(plato, id) {
    let pedido = { plato: 0 };
    let cantidad = parseInt(document.getElementById("labCantidad" + id).innerHTML);
    pedido.cantidad = isNaN(cantidad) ? 1 : cantidad; // Si la conversión falla, establecemos la cantidad en 1
    articulosTotales += pedido.cantidad;
    pedido.plato = plato;
    carritoPedido.push(pedido);
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carritoPedido));
    agregarPedido(plato, carritoPedido.length - 1, pedido.cantidad,productoPedido);
    document.getElementById("artCantidad").innerHTML = "Articulos en el carrito: " + articulosTotales;
    actualizarNumeroCarrito();
}

function cargoPedido(productos) {
    productoPedido = productos
    let usuario = sessionStorage.getItem("usuario")
    if (usuario != null){
        document.getElementById('ingresar').innerText = "⛵ " + usuario
        document.getElementById('CerrarSesion').style.opacity=1
    } else {
        document.getElementById('CerrarSesion').style.opacity=0
    }
    valorTotal = 0;
    if (Storage != undefined) {
        carritoPedido = JSON.parse(localStorage.getItem("carrito"));
        if (carritoPedido != undefined) {
            for (p in carritoPedido) {
                agregarPedido(carritoPedido[p].plato, p, carritoPedido[p].cantidad,productos);
                articulosTotales += parseInt(carritoPedido[p].cantidad);
            }
            document.getElementById("artCantidad").innerHTML = "Articulos en el carrito: " + articulosTotales;
            document.getElementById("precio").innerHTML = "$ " + valorTotal.toFixed(2);
            actualizarNumeroCarrito();
        } else {
            carritoPedido = [];
        }
    }
}

async function cargoPedidoSinDb() {
    let usuario = sessionStorage.getItem("usuario")
    if (usuario != null){
        document.getElementById('ingresar').innerText = "⛵ " + usuario
        document.getElementById('CerrarSesion').style.opacity=1
    } else {
        document.getElementById('CerrarSesion').style.opacity=0
    }
    valorTotal = 0;
    let dbProductos2 = {
        "productos": []
    };
    let prod2 = []
    let precios = []
    await fetch(urlServer)
    .then((res) => res.json())
    .then((data) => 
            { 
                for (let a=0; a< data.length;a++){
                    prod2.push(data[a])
                }
            });
    dbProductos2.productos = prod2
    await fetch(urlPrecios)
    .then((res) => res.json())
    .then ((data) => 
        {
            for (let a=0; a< data.length;a++){
                precios.push(data[a])
            }
        }
    )
    for (let a=0; a < dbProductos2.productos.length;a++ ) {
        if (precios[a] != undefined) {
            dbProductos2.productos[a].precio = precios[a].precio
        }
    }
    if (Storage != undefined) {
        carritoPedido = JSON.parse(localStorage.getItem("carrito"));
        if (carritoPedido != undefined) {
            for (p in carritoPedido) {
                agregarPedido(carritoPedido[p].plato, p, carritoPedido[p].cantidad,dbProductos2);
                articulosTotales += parseInt(carritoPedido[p].cantidad);
            }
            document.getElementById("artCantidad").innerHTML = "Articulos en el carrito: " + articulosTotales;
            document.getElementById("precio").innerHTML = "$ " + valorTotal.toFixed(2);
            actualizarNumeroCarrito();
        } else {
            carritoPedido = [];
        }
    }
}


/*
// Obtener los precios de los productos
function obtenerPrecios() {
    let platosEnCarrito = JSON.parse(localStorage.getItem("carrito"));
    return platosEnCarrito.map(item => dbProductos.productos[item.plato].precio);
}

// Mostrar los precios en el contenedor HTML
function mostrarPrecios(precios) {
    let listaPrecios = document.getElementById("lista-precios");
    if (listaPrecios) {
        precios.forEach(precio => {
            let precioElement = document.createElement("p");
            precioElement.textContent = "Precio: " + precio;
            listaPrecios.appendChild(precioElement);
        });
    } else {
        console.error("No se encontró el contenedor lista-precios");
    }
}

// Obtener los precios y mostrarlos
let precios = obtenerPrecios();
mostrarPrecios(precios);

/*
function obtenerPedidos() {
    // Obtener los elementos del carrito de la memoria
    let platosEnCarrito = JSON.parse(localStorage.getItem("carrito"));
    
    // Utilizar map para obtener los precios de los productos
    let precios = platosEnCarrito.map(item => dbProductos.productos[item.plato].precio);

    // Devolver el array con todos los precios
    return precios;
    
}


/*

function obtenerPedidos() {
   let platosEnCarrito = JSON.parse(localStorage.getItem("carrito"));
   return dbProductos.productos [platosEnCarrito[1].plato].precio
   
}


/* FIN FUNCIONES DEL CARRITO */ 
