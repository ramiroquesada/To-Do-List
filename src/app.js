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
  let fechalimite = document.getElementById("inputFechaLimite").value;

  let todoname = document.getElementById("todoname").value;
  let tododescription = document.getElementById("tododescription").value;
  let todoprioridad = document.getElementById("todoprioridad").value;

  
  if(todoname == '' || tododescription == '' || fechalimite == ''){

    return
  }
  
  let tarea = new todos(
    todoname,
    tododescription,
    fechalimite,
    todoprioridad
  );
  todosArray.push(tarea);
  renderTodos();
  console.log(todosArray);
};

btnCrearTarea.addEventListener("click", crearTarea);



//RENDERIZA LOS TODOS DEL ARRAY TODOSARRAY


let renderTodos = () => {
  tareas.innerHTML = ``;

  todosArray.forEach((todo) => {
    let tareali = document.createElement("li");
    tareali.setAttribute('id', todo.id)
    tareali.innerHTML = `<div>${todo.title}</div> <div>${todo.description}</div> <div>${todo.dueDate}</div> <div>${todo.priority}</div> <div><button type="button">Editar</button></div><div><button type="button">Eliminar</button></div>`;
    tareas.appendChild(tareali);
  });
};
