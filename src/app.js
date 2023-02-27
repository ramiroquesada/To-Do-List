import "./reset.css";
import "./styles.css";

import "./modal.css";

import "./modal";

import todos from "./tareas";



const todosArray = [];

const projectsArray = [];








let btnCrearTarea = document.getElementById("nuevaTareaButton");
let tareas = document.getElementById("tareas");

let crearTarea = () => {
  let nuevaTareaForm = document.getElementById("nuevaTareaForm");
  let fechalimite = document.getElementById("inputFechaLimite").value;

  let fecha = new Date(fechalimite);

  fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());

  let fechaFormateada = fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  let todoname = document.getElementById("todoname").value;

  let todoprioridad = document.getElementById("todoprioridad").value;

  if (todoname == "" || fechalimite == "") {
    let msgNuevaTarea = document.getElementById("msgNuevaTarea");
    msgNuevaTarea.innerText = "Debe completar todos los campos";
    setTimeout(() => {
      msgNuevaTarea.innerText = "";
    }, 3000);

    return;
  }

  let tarea = new todos(todoname, fechaFormateada, todoprioridad);
  todosArray.push(tarea);
  renderTodos();

  nuevaTareaForm.reset();
  modal.style.display = "none";

  console.log(todosArray);
};

btnCrearTarea.addEventListener("click", crearTarea);


//EDITAR TAREA







let editTodo = (e)=>{
  let liId = e.target.parentElement.parentElement.parentElement.id;
  

  

}























//RENDERIZA LOS TODOS DEL ARRAY TODOSARRAY

let renderTodos = () => {
  tareas.innerHTML = ``;

  todosArray.forEach((todo) => {
    
    let tareali = document.createElement("li");
    tareali.setAttribute("id", todo.id);
    
    tareali.innerHTML = `<div class="todoLeft"><div><input type="checkbox" title="checkCompleted"  class="checkboxTodo"></div> <div class="todoTitle">${todo.title}</div></div><div class="todoRight"><div class="todoFecha">${todo.dueDate}</div> <div class="todoPriority">${todo.priority}</div><div class="editDeleteContainer"> <div class="editTodoContainer"><i class="fa-solid fa-pen-to-square"></i></div><div class="deleteTodoContainer"><i class="fa-solid fa-trash"></i></div></div></div>`;


    let editBtn = tareali.querySelector(".editTodoContainer");
    editBtn.addEventListener("click", editTodo);
    

    
    tareas.appendChild(tareali);

  });




};

//TESTING

let tareaProvisional = new todos("Ir al baño", "02/03/23", "Alto");
let tarea2 = new todos(
  "Hola mi nombre es jesus y me gusta aprender javascript nashe",
  "02/03/23",
  "Medio"
);
todosArray.push(tareaProvisional, tarea2);
renderTodos();



console.log(tarea2.getTitle());



