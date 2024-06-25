const formulario1 =  document.querySelector("#formRegistro");


async function enviarDatos() {
    const datosFormulario = new FormData(formulario1);
    let arreglo = [];
    for (const [llave,valor] of datosFormulario) {
        arreglo.push(valor);
    }
    let json = new Object;
    json.nombre = arreglo[0];
    json.apellido = arreglo[1];
    json.email = arreglo[2];
    json.telefono = arreglo[4];
    json.direccion = arreglo[5];
    json.piso = parseInt(arreglo[6]);
    json.departamento = arreglo[7];
    json.ciudad = arreglo[8];
    json.provincia = arreglo[9];
    json.pais = arreglo[10];
    json.carnivoro = 1;
    json.celiaco = 1;
    json.vegano = 1;
    json.vegetariano = 1;
    json.contrasena  = arreglo[15];
    let cadenaJSON = JSON.stringify(json)
    try {
      const response = await fetch("http://127.0.0.1:5000/cliente", {
        method: "POST",
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
  }
  
  formulario1.addEventListener("submit", (event) => {
    event.preventDefault();
    enviarDatos();
    span.onclick()
  });