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
        const image = document.getElementById('image').files[0];

        const formData = new FormData();
        formData.append('nombre', name);
        formData.append('descripcion', details);
        formData.append('tipo', type);
        formData.append('imgRuta', image);

        const formDataPrecio = new FormData();
        formDataPrecio.append('idCliente', id);
        formDataPrecio.append('precio', price);
        formDataPrecio.append('vigencia', "29/6/2024");


        if (id) {
            formData.append('id', id);
            await updateDish(id, formData);
            await updatePrice(id, precio)
        } else {
            await addDish(formData);
            await addPrice(formDataPrecio)
        }

        form.reset();
        loadDishes();
    });

    async function addDish(dish) {
        const response = await fetch('http://localhost:5000/platos', {
            method: 'POST',
            body: dish
        });
        return response.json();
    }
    async function addPrice(precios) {
        const response = await fetch('http://localhost:5000/precios', {
            method: 'POST',
            body: precios
        });
        return response.json();
    }
    async function updateDish(id, dish) {
        const response = await fetch(`http://localhost:5000/platos?editarid=${id}`, {
            method: 'PUT',
            body: dish
        });
        return response.json();
    }
    async function updatePrice(id, precio) {
        const response = await fetch(`http://localhost:5000/precios?editarid=${id}`, {
            method: 'PUT',
            body: precio
        });
        return response.json();
    }

    async function deleteDish(id) {
        await fetch(`http://localhost:5000/platos?borrarid=${id}`, {
            method: 'DELETE'
        });
        loadDishes();
    }

    async function loadDishes() {
        const response = await fetch('http://localhost:5000/platos?traertodos=1');
        dishes = await response.json();
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
                document.getElementById('name').value = dish.name;
                document.getElementById('details').value = dish.details;
                document.getElementById('type').value = dish.type;
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
