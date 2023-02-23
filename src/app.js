import "./reset.css";
import "./styles.css";

import "./modal.css";

import "./modal";

import todos from "./tareas";

const todosArray = [];

const projectsArray = [];

const priority = ["Bajo", "Normal", "Alto"];

let btnCrearTarea = document.getElementById("nuevaTareaButton");
let tareas = document.getElementById("tareas");

let crearTarea = () => {
  let fechalimite = document.getElementById("inputFechaLimite");

  let todoname = document.getElementById("todoname");
  let tododescription = document.getElementById("tododescription");
  let todoprioridad = document.getElementById("todoprioridad");

  let tarea = new todos(
    todoname.value,
    tododescription.value,
    fechalimite.value,
    todoprioridad.value
  );
  todosArray.push(tarea);
  renderTodos();
  console.log(todosArray);
};

btnCrearTarea.addEventListener("click", crearTarea);

let renderTodos = () => {
  tareas.innerHTML = ``;

  todosArray.forEach((todo) => {
    let tareali = document.createElement("li");
    tareali.innerHTML = `${todo.title}, ${todo.description}, ${todo.dueDate}, ${todo.priority} <button type="button">Editar</button><button type="button">Eliminar</button>`;
    tareas.appendChild(tareali);
  });
};
