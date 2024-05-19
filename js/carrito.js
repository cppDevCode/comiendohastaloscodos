document.addEventListener('DOMContentLoaded', function() {
    let carritoPedido = JSON.parse(localStorage.getItem('carrito')) || [];

    function renderizarproductos() {
        const listaProductos = document.getElementById('listaProductosAComprar');
        listaProductos.innerHTML = '';
        let valorTotal = 0;
        let articulosTotales = 0;

        carritoPedido.forEach((item, index) => {
            const producto = dbProductos.productos[item.plato];
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
                        <h3>$${(producto.precio * item.cantidad).toFixed(2)}</h3>
                    </div>
                    <div class="cantidadPlatoCarrito">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="number" value="${item.cantidad}" min="1" readonly>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
            `;
            listaProductos.appendChild(li);
            valorTotal += producto.precio * item.cantidad;
            articulosTotales += item.cantidad;
        });

        document.getElementById('precio').textContent = `$${valorTotal.toFixed(2)}`;
        document.getElementById('artCantidad').textContent = `Artículos en el carrito: ${articulosTotales}`;
    }

    window.updateQuantity = function(index, amount) {
        let cantidadactual = carritoPedido[index].cantidad;
        cantidadactual = parseInt(cantidadactual) + amount;
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
