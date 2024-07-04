async function configuracion() {
    let usuario = sessionStorage.getItem("usuario");
    let id = sessionStorage.getItem("id");
    const urlAPI = "https://pascalizado.pythonanywhere.com/cliente?idcliente="
    let jsonCliente;
    const btnIngresar = document.getElementById('ingresar');
    const menuDesplegable = document.getElementById('menuDesplegable');
    const btnMenuDesplegable = document.getElementById('btnMenuDesplegable');
    let formulario = document.getElementById('formularioConfiguracion');

    if (usuario != null){
        menuDesplegable.hidden = false;
        console.log(usuario);
        btnMenuDesplegable.innerHTML = '⛵ ' + usuario
        btnIngresar.hidden = true;

    } else {
        menuDesplegable.hidden = true;
        btnIngresar.hidden = false;
    }
    
    await fetch(urlAPI + id)
    .then((res) => res.json())
    .then(data => jsonCliente = data);
    formulario["nombre2"].value = jsonCliente.nombre;
    formulario["apellido2"].value = jsonCliente.apellido;
    formulario["telefono2"].value = jsonCliente.telefono;
    formulario["email2"].value = jsonCliente.email;
    formulario["direccion"].value = jsonCliente.direccion;
    formulario["piso"].value = jsonCliente.piso;
    formulario["departamento"].value = jsonCliente.departamento;
    formulario["ciudad"].value = jsonCliente.ciudad;
    formulario["provincia2"].value = jsonCliente.provincia;
    formulario["pais2"].value = jsonCliente.pais;
    if (jsonCliente.carnivoro == 1) {
        formulario["dieta4"].checked = true
    }
    if (jsonCliente.vegetariano == 1) {
        formulario["dieta5"].checked = true
    }
    if (jsonCliente.celiaco == 1) {
        formulario["dieta6"].checked = true
    }
    if (jsonCliente.vegano == 1) {
        formulario["dieta7"].checked = true
    }

    formulario["contrasena2"].value = jsonCliente.contrasena;
    
}


async function guardoCambios(){
    event.preventDefault();
    const urlAPI = 'https://pascalizado.pythonanywhere.com/cliente?editarid=';
    const formulario = document.getElementById('formularioConfiguracion');
    const id = sessionStorage.getItem('id');
    if (document.getElementById('contrasena2').value == document.getElementById('contrasena3').value){
        let cadenaJSON = new Object();
        cadenaJSON.nombre = formulario["nombre2"].value;
        cadenaJSON.apellido = formulario["apellido2"].value;
        cadenaJSON.telefono = formulario["telefono2"].value;
        cadenaJSON.email = formulario["email2"].value;
        cadenaJSON.direccion = formulario["direccion"].value;
        cadenaJSON.piso = formulario["piso"].value;
        cadenaJSON.departamento = formulario["departamento"].value;
        cadenaJSON.ciudad = formulario["ciudad"].value;
        cadenaJSON.provincia = formulario["provincia2"].value;
        cadenaJSON.pais = formulario["pais2"].value;
        if (formulario["dieta4"].checked) {
            cadenaJSON.carnivoro = 1;
        }
        else{
            cadenaJSON.carnivoro = 0;
        }
        if (formulario["dieta5"].checked) {
            cadenaJSON.vegetariano = 1;
        } else {
            cadenaJSON.vegetariano = 0;
        }
        if (formulario["dieta6"].checked) {
            cadenaJSON.celiaco = 1;
        } else {
            cadenaJSON.celiaco = 0;
        }
        if (formulario["dieta7"].checked) {
            cadenaJSON.vegano =  1;
        } else {
            cadenaJSON.vegano =  0;
        }
        cadenaJSON.contrasena = formulario["contrasena2"].value
        cadenaJSON = JSON.stringify(cadenaJSON);
        
        
        try {
            const response = await fetch(urlAPI + id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: cadenaJSON,
            });
            console.log(await response.json());
        } catch (e) {
            console.error(e);
        }
        sessionStorage.setItem("usuario",formulario["nombre2"].value)
        location.href = './index.html'
    } else {
        alert ('No coinciden las contraseñas');
    }
}

