let carritoPedido = new Array();
let valorTotal = 0;
let articulosTotales = 0;



/* FUNCIONES DEL CARRITO */ 

function cerrarClick(idElemento,plato, cantidad) {
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
        carritoPedido.splice(plato,1);
        localStorage.removeItem("carrito");
        localStorage.setItem("carrito",JSON.stringify(carritoPedido));
    }
    
}

function agregarPedido (plato, p,cantidad){
    document.getElementById("listaProductosAComprar").innerHTML += `<li class="liCarrito" id="liCarrito`+ p +`">
                                    <div class="tarjetaProducto">
                                        <div class="imagenPlatoCarrito">
                                            <img class="imagenPlatoCarrito" src="` + dbProductos.productos[plato].imgRuta +`" alt="`+ dbProductos.productos[plato].nombre +`">
                                        </div>
                                        <div class="nombrePlatoCarrito">
                                            <h4>`+ dbProductos.productos[plato].nombre + `</h4>
                                        </div>
                                        <div class="eliminarPlatoCarrito">
                                            <span class="cerrar" id="Cerrar` + plato + `" onclick="cerrarClick('liCarrito`+ p +`',` + p + `,` + cantidad + `)"><i class="fa-regular fa-circle-xmark"></i></span>
                                        </div>
                                        <div class="valorPlatoCarrito">
                                            <h3>$ ` + (dbProductos.productos[plato].precio * cantidad) +  `</h3>
                                        </div>
                                        <div class="cantidadPlatoCarrito">
                                            Cantidad: ` + cantidad + `
                                        </div>
                                    </div>
                                </li>`
    valorTotal += dbProductos.productos[plato].precio * cantidad;
    document.getElementById("precio").innerHTML = "$ " + valorTotal.toFixed(2);
}


function agregarYSalvarPedido(plato, id){
    let pedido = {plato: 0};
    pedido.cantidad = document.getElementById("labCantidad" + id).innerHTML;
    articulosTotales += parseInt(pedido.cantidad);
    pedido.plato = plato;
    carritoPedido.push(pedido);
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito",JSON.stringify(carritoPedido));
    agregarPedido(plato,carritoPedido.length-1,pedido.cantidad);
    document.getElementById("artCantidad").innerHTML = "Articulos en el carrito: " + articulosTotales;
}

function cargoPedido (){
    agregarBotoneraCarrusel();
    valorTotal = 0;
    if (Storage != undefined) {
        carritoPedido = JSON.parse(localStorage.getItem("carrito"));
        if (carritoPedido != undefined) {
            for (p in carritoPedido) {
                agregarPedido(carritoPedido[p].plato,p,carritoPedido[p].cantidad);
                articulosTotales += parseInt(carritoPedido[p].cantidad);
            }
            document.getElementById("artCantidad").innerHTML = "Articulos en el carrito: " + articulosTotales;
            document.getElementById("precio").innerHTML = "$ " + valorTotal.toFixed(2);
        } else {
            carritoPedido = [];
        }
    }
}

/* FIN FUNCIONES DEL CARRITO */ 