let carritoPedido = new Array();
let valorTotal = 0;

function agregarPedido (plato){
    document.getElementById("listaProductosAComprar").innerHTML += `<li id="liCarrito">
                                    <div class="tarjetaProducto">
                                        <div class="imagenPlatoCarrito">
                                            <img class="imagenPlatoCarrito" src="` + dbProductos.productos[plato].imgRuta +`" alt="`+ dbProductos.productos[plato].nombre +`">
                                        </div>
                                        <div class="nombrePlatoCarrito">
                                            <h4>`+ dbProductos.productos[plato].nombre + `</h4>
                                        </div>
                                        <div class="eliminarPlatoCarrito">
                                            <span class="cerrar"><i class="fa-regular fa-circle-xmark"></i></span>
                                        </div>
                                        <div class="valorPlatoCarrito">
                                            <h3>$ ` + dbProductos.productos[plato].precio +  `</h3>
                                        </div>
                                        <div class="cantidadPlatoCarrito">
                                            Cantidad: 2
                                        </div>
                                    </div>
                                </li>`
    valorTotal += dbProductos.productos[plato].precio;
    document.getElementById("precio").innerHTML = "$ " + valorTotal.toFixed(2);
}


function agregarYSalvarPedido(plato){
    let pedido = {plato: 0};
    pedido.plato = plato;
    carritoPedido.push(pedido);
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito",JSON.stringify(carritoPedido));
    agregarPedido(plato);
    document.getElementById("artCantidad").innerHTML = "Articulos en el carrito: " + carritoPedido.length;
}

function cargoPedido (){
    valorTotal = 0;
    if (Storage != undefined) {
        carritoPedido = JSON.parse(localStorage.getItem("carrito"));
        if (carritoPedido != undefined) {
            for (p in carritoPedido) {
                agregarPedido(carritoPedido[p].plato);
            }
            document.getElementById("artCantidad").innerHTML = "Articulos en el carrito: " + carritoPedido.length;
            document.getElementById("precio").innerHTML = "$ " + valorTotal.toFixed(2);
        } else {
            carritoPedido = [];
        }
    }
}

