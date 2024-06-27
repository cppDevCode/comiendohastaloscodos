document.addEventListener('DOMContentLoaded', function() {
    const urlServer = 'http://127.0.0.1:5000/platos?traertodos=1'
    const urlPrecios = 'http://127.0.0.1:5000/precios?traertodos=1'
    let carritoPedido = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoPedido = carritoPedido.map(item => ({
        ...item,
        cantidad: Number(item.cantidad) || 1
    }));

    localStorage.setItem('carrito', JSON.stringify(carritoPedido));

    async function renderizarproductos() {
        const listaProductos = document.getElementById('listaProductosAComprar');
        listaProductos.innerHTML = '';
        let valorTotal = 0;
        let dbProductos = {
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
        dbProductos.productos = prod2
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
        carritoPedido.forEach((item, index) => {
            const producto = dbProductos.productos[item.plato];
            const cantidad = item.cantidad;
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="tarjetaProducto">
                    <div class="imagenPlatoCarrito">
                        <img src="${producto.imgRuta}" alt="${producto.nombre}">
                    </div>
                    <div class="nombrePlatoCarrito">
                        <h4>${producto.nombre}</h4>
                    </div>
                    <div class="valorPlatoCarrito">
                        <h3>$${(producto.precio * cantidad).toFixed(2)}</h3>
                    </div>
                    <div class="cantidadPlatoCarrito">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="number" value="${cantidad}" min="1" readonly>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
            `;
            listaProductos.appendChild(li);
            valorTotal += producto.precio * parseInt(cantidad);
        });

        document.getElementById('precio').textContent = `$${valorTotal.toFixed(2)}`;
        // No se muestra "Artículos en el carrito"
    }

    window.updateQuantity = function(index, amount) {
        let cantidadactual = carritoPedido[index].cantidad;
        cantidadactual = Number(cantidadactual) + amount;
        if (cantidadactual < 1) {
            cantidadactual = 1;
        }
        carritoPedido[index].cantidad = cantidadactual;

        localStorage.setItem('carrito', JSON.stringify(carritoPedido));

        renderizarproductos();
    }
    
    renderizarproductos();

    document.getElementById('formulario-envio').addEventListener('submit', function(event) {
        event.preventDefault();
        const direccion = document.getElementById('direccion').value;
        const viviendatipo = document.getElementById('vivienda-tipo').value;
        const telefono = document.getElementById('telefono').value;
        const informacionadicional = document.getElementById('informacion-adicional').value;

        alert('Información de envío guardada');
    });

    document.getElementById('formulario-pago').addEventListener('submit', function(event) {
        event.preventDefault();
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        alert('Pago procesado correctamente');
    });
});
// Función para limpiar el carrito y actualizar el precio total
function limpiarCarrito() {
    localStorage.removeItem('carrito'); // Elimina el carrito del localStorage
    
    // Establece el precio total a 0
    let valorTotal = 0;
    document.getElementById('precio').textContent = '$' + valorTotal.toFixed(2);

    // Borra el contenido del carrito en el HTML
    document.getElementById('listaProductosAComprar').innerHTML = ''; 
    
    document.getElementById('artCantidad').textContent = 'Artículos en el carrito: 0';

    // Renderiza nuevamente los productos (que ahora están vacíos)
    renderizarproductos();
}
