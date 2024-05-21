const formulario = document.getElementById("form2");
const nombre = document.getElementById("nombreRegistro");
const apellido = document.getElementById("Apellido");
const email = document.getElementById("email");
const comentario =document.getElementById("comentario")

function ValidarEmail(mail) 

{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("email").value))
  {
    return (true)
  }
    
    return (false)
}

function contarTexto()
{   
    document.getElementById("areaTexto").innerHTML= comentario.value.length + '/250'
}

formulario.addEventListener("submit", e=>{
    e.preventDefault()
    let comprobar = true

    if(nombre.value.length < 3){
        document.getElementById("cortoNombre").innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> El nombre ingresado es corto'
        document.getElementById("nombreRegistro").focus();
        comprobar = false
    }
    else{
        document.getElementById("cortoNombre").innerHTML = ''
        
    }
    if(apellido.value.length < 3){
        document.getElementById("cortoApellido").innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> El Apellido debe contener mas de 3 caracteres'
        document.getElementById("Apellido").focus();
        comprobar = false
    }
    else{
        document.getElementById("cortoApellido").innerHTML = ''
        
    }

    if (!ValidarEmail(mail)){
        
        document.getElementById("emailMalo").innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Email incorrecto'
        document.getElementById("email").focus();
        comprobar = false
    }
   

    if (comentario.value.length > 250 )
        {
            document.getElementById("areaTexto").innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> El texto supera los 250 caracteres'
            document.getElementById("comentario").focus();
            comprobar = false            
        }
    
    if (comprobar)
        {
        document.getElementById("modalContactar").style.display="none";
       }
})


