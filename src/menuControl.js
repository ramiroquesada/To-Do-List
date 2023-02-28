import { todosArray } from "./app";
import "./app"
import "./styles.css"

let menuCerrado = document.getElementById('menuCerrado');
let menuAbierto = document.getElementById('menuAbierto');

let menuPrincipal = document.getElementById('menuPrincipal');

let contentPrincipal = document.getElementById('contentPrincipal')



let abrirMenu = ()=>{
    menuAbierto.style.display = "flex";
    menuCerrado.style.display = "none";
    menuPrincipal.classList.add("menuOpened");
    contentPrincipal.classList.add("contentDetras")

}


menuCerrado.addEventListener("click", abrirMenu);


let cerrarMenu = ()=>{
    menuCerrado.style.display = "flex";
    menuAbierto.style.display = "none";
    menuPrincipal.classList.remove("menuOpened");
    contentPrincipal.classList.remove("contentDetras")
}



menuAbierto.addEventListener("click", cerrarMenu);


