document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario-plato');
    const dishList = document.getElementById('lista-platos');
    let dishes = [];

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('id-plato').value;
        const name = document.getElementById('name').value;
        const details = document.getElementById('details').value;
        const type = document.getElementById('type').value;
        const price = document.getElementById('price').value;
        const image = "./img/platos/" + document.getElementById('image').files.item(0).name;

        const formData = new FormData();
        formData.append('nombre', name);
        formData.append('descripcion', details);
        formData.append('tipo', type);
        formData.append('imgRuta', image);

        const formDataPrecio = new FormData();
        formDataPrecio.append('idPlato', id);
        formDataPrecio.append('precio', price);
        formDataPrecio.append('vigencia', "2024-02-05T12:59:11.332");


        if (id) {
            formData.append('id', id);
            await updateDish(id, formData);
            await updatePrice(id, formDataPrecio)
        } else {
            await addDish(formData);
            await addPrice(formDataPrecio)
        }

        form.reset();
        loadDishes();
    });

    async function addDish(dish) {
        let plato = new Object();
        plato.nombre = dish.get("nombre");
        plato.descripcion = dish.get("descripcion");
        plato.imgRuta = dish.get("imgRuta");
        plato.tipo = dish.get("tipo");
        plato = JSON.stringify(plato);
        const response = await fetch('http://localhost:5000/platos', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: plato
        });
        return response.json();
    }
    async function addPrice(precios) {
        let precio = new Object();
        let ultimoID
        await fetch('http://localhost:5000/precios?getultimoid=1')
        .then ((res) => res.json())
        .then ((data) => ultimoID = data["ultimoID"])
        precio.idPlato = ultimoID;
        precio.precio = precios.get("precio");
        precio.vigencia = precios.get("vigencia");
        precio = JSON.stringify(precio)
    
        const response = await fetch('http://localhost:5000/precios', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: precio
        });
        return response.json();
    }
    
    async function updateDish(id, dish) {
        
        let plato = new Object();
        plato.nombre = dish.get("nombre");
        plato.descripcion = dish.get("descripcion")
        plato.imgRuta = dish.get("imgRuta")
        plato.tipo = dish.get("tipo")        
        plato = JSON.stringify(plato)
        const response = await fetch(`http://localhost:5000/platos?editarid=${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'PUT',
            body: plato
        });
        return response.json();
    }
    async function updatePrice(id, precio) {
        let precioP = new Object();
        precioP.idPlato = parseInt(precio.get("idPlato"))
        precioP.precio = precio.get("precio")
        precioP.vigencia = precio.get("vigencia")
        precioP = JSON.stringify(precioP)
        const response = await fetch(`http://localhost:5000/precios?editarid=${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'PUT',
            body: precioP
        });
        return response.json();
    }

    async function deleteDish(id) {
        await fetch(`http://localhost:5000/platos?borrarid=${id}`, {
            method: 'DELETE'
        });
        await fetch(`http://localhost:5000/precios?borrarid=${id}`, {
            method: 'DELETE'
        });
        loadDishes();
    }

    async function loadDishes() {
        const response = await fetch('http://localhost:5000/platos?traertodos=1');
        dishes = await response.json();
        let precios = []
        await fetch('http://localhost:5000/precios?traertodos=1')
        .then((res) => res.json())
        .then ((data) => 
        {
            for (let a=0; a< data.length;a++){
                precios.push(data[a])
            }
        }
        )
        for (let b=0; b < dishes.length;b++) {
            dishes[b].price = precios[b].precio;
        }
        
        
        renderDishes();
    }

    function renderDishes() {
        dishList.innerHTML = ''; // Limpiamos la lista antes de renderizar de nuevo
    
        // Recorremos los platos y creamos los elementos li
        dishes.forEach(dish => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="dish-details">
                    <strong>Nombre:</strong> ${dish.nombre}<br>
                    <strong>Detalle:</strong> ${dish.descripcion}<br>
                    <strong>Tipo:</strong> ${dish.tipo}<br>
                    <strong>Precio:</strong> $${dish.price.toFixed(2)}
                </div>
            `;
            
            // Creamos el contenedor para los botones
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');
            
            // Botón Editar
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.addEventListener('click', () => {
                document.getElementById('id-plato').value = dish.id;
                document.getElementById('name').value = dish.nombre;
                document.getElementById('details').value = dish.descripcion;
                document.getElementById('type').value = dish.tipo;
                document.getElementById('price').value = dish.price;
            });
            
            // Botón Eliminar
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.addEventListener('click', () => deleteDish(dish.id));
            
            // Añadimos los botones al contenedor
            buttonContainer.appendChild(editBtn);
            buttonContainer.appendChild(deleteBtn);
            
            // Añadimos el contenedor de botones al elemento li
            li.appendChild(buttonContainer);
            
            // Añadimos el elemento li al inicio de la lista
            dishList.insertBefore(li, dishList.firstChild);
        });
    }

    loadDishes();
});
