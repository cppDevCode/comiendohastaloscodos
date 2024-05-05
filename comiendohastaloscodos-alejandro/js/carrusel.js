
function cambiarPlato (nombrePlato){
    let platos = [ ["./img/platos/burguers-veganas-linwoods.jpg", "./img/platos/caldereta-de-seitan.jpg",
    "./img/platos/Lasania-vegetal.jpg","./img/platos/pizza-Margherita.jpg","./img/platos/sopa-ramen-taifun.jpg"],
     ["Hamburguesas veganas de quinoa y garbanzos","Caldereta de seitán","Lasaña vegana",
     "Pizza Margherita", "Sopa reman taifun"]]

    document.getElementById("imgPlatos").src= platos [0][nombrePlato];
    document.getElementById("tituloCarrusel").innerHTML = platos [1][nombrePlato];;

    switch (nombrePlato){
    case 0:
        document.getElementById('imgAnterior').style.opacity = 0;
        document.getElementById('imgPost').style.opacity = 0.3;
        document.getElementById("imgPost").src= platos [0][nombrePlato +1 ];
        break;
       
    case 4:
        document.getElementById('imgAnterior').style.opacity = 0.3;
        document.getElementById('imgPost').style.opacity = 0;
        document.getElementById("imgAnterior").src= platos [0][nombrePlato -1 ];
        break;
    default:
        document.getElementById('imgAnterior').style.opacity = 0.3;
        document.getElementById('imgPost').style.opacity = 0.3;
        document.getElementById("imgAnterior").src= platos [0][nombrePlato -1 ];
        document.getElementById("imgPost").src= platos [0][nombrePlato +1 ];
        break;
    }
}
