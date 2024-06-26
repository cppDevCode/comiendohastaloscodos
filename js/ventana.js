function mostrarVentana() {
    let usuario = sessionStorage.getItem("usuario")
    if (usuario != null){
        document.getElementById('ingresar').innerText = "⛵ " + usuario
    }
}