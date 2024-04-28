let bahiaBlanca = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6789.451349404773!2d-62.257093317938754!3d-38.718334628764985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1714084357581!5m2!1ses!2sar";
let hudson = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d64168.859226768574!2d-58.19763038133948!3d-34.7945469733082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a327003a208549%3A0x5ad3f1042a6eb9d3!2sGuillermo%20Enrique%20Hudson%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1714084444685!5m2!1ses!2sar";
let caba = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.45340221193!2d-58.51569868333638!3d-34.61565477012846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1714084476097!5m2!1ses!2sar";
let marDelplata = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12576.695696995768!2d-57.56303142379719!3d-37.99640349111017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dc039ff5e71d%3A0xd09d767de077cb04!2sPlaza%20San%20Mart%C3%ADn!5e0!3m2!1ses!2sar!4v1714343438194!5m2!1ses!2sar";

let btnBahia = document.getElementById('btnBahia');
let btnCaba = document.getElementById('btnCaba');
let btnHudson = document.getElementById('btnHudson');
let btnRegistrar = document.getElementById('btnRegistrar');
let btnMDQ = document.getElementById('btnMDQ');
let btnAnterior = btnBahia;

btnBahia.onclick = function(){
    document.getElementById('imapa').src = bahiaBlanca;
    btnBahia.className = "btnFranquicia btnApretado";
    btnAnterior.className = "btnFranquicia btnGen";
    btnAnterior = btnBahia;
}

btnMDQ.onclick = function(){
    document.getElementById('imapa').src = marDelplata;
    btnMDQ.className = "btnFranquicia btnApretado";
    btnAnterior.className = "btnFranquicia btnGen";
    btnAnterior = btnMDQ;
}

btnCaba.onclick = function(){
    document.getElementById('imapa').src = caba;
    btnCaba.className = "btnFranquicia btnApretado";
    btnAnterior.className = "btnFranquicia btnGen";
    btnAnterior = btnCaba;
}

btnHudson.onclick = function(){
    document.getElementById('imapa').src = hudson;
    btnHudson.className = "btnFranquicia btnApretado";
    btnAnterior.className = "btnFranquicia btnGen";
    btnAnterior = btnHudson;
}

btnRegistrar.onclick = function() {
    document.getElementById("registrar").style.height = "60vh";
    document.getElementById('contenedorLogin').style.display='none';
    document.getElementById('textoBienvenidaRegistro').style.display = 'none';
    document.getElementById('formularioRegistro').style.display = 'block';
    document.getElementById('formularioRegistro').style.display = 'block';
    document.getElementById('xRegistrar').style.display='block';
}