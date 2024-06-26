function mostrarVentana() {
    let usuario = sessionStorage.getItem("usuario")
    if (usuario != null){
        document.getElementById('ingresar').innerText = "⛵ " + usuario
        document.getElementById('CerrarSesion').style.opacity=1
    } else {
        document.getElementById('CerrarSesion').style.opacity=0
    }
}