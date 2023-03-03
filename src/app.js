import "./reset.css";
import "./styles.css";

import "./modal.css";

import "./modal";

import Todos from "./tareas";

import Proyectos from "./menuControl.js";

import "./menuControl";

import { updateMenu } from "./menuControl.js";

export const todosArray = [];

export const projectsArray = [];

//cambio nombre de pestaña cuando se va xDD

let tituloPrevio = document.title;


window.addEventListener("blur", () => {
  tituloPrevio = document.title;
  document.title = "No te vayas 😢";
});

window.addEventListener("focus", () => {
  document.title = tituloPrevio;
});

let btnCrearTarea = document.getElementById("nuevaTareaButton");

let crearTarea = () => {
  let fechalimite = document.getElementById("inputFechaLimite").value;

  let todoname = document.getElementById("todoname").value;

  let todoprioridad = document.getElementById("todoprioridad").value;

  if (todoname == "" || fechalimite == "") {
    let timerInterval;
    Swal.fire({
      heightAuto: false,
      title: "Debe rellenar los campos!",
      timer: 2000,
      timerProgressBar: true,
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });

    return;
  }

  let tarea = new Todos(todoname, fechalimite, todoprioridad);
  todosArray.push(tarea);
  renderTodos();

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Tarea creada!",
    showConfirmButton: false,
    timer: 2000,
    heightAuto: false,
  });

  nuevaTareaForm.reset();
  modal.style.display = "none";
};

btnCrearTarea.addEventListener("click", crearTarea);

//OBTENER TODO POR ID

let getTodoById = (id) => {
  return todosArray.find(function (todo) {
    return todo.id === id;
  });
};

const getProjectById = (id) => {
  return projectsArray.find(function (project) {
    return project.id == id;
  });
};

//EDITAR TAREA

let editTodo = (e) => {
  let todoIdFromLi = e.target.parentElement.parentElement.parentElement.id;

  let todo = getTodoById(todoIdFromLi);

  modal.style.display = "block";
  modalNuevaTarea.style.display = "none";
  modalEditarTarea.style.display = "flex";

  let todonameEdit = document.getElementById("todonameEdit");
  let inputFechaLimiteEdit = document.getElementById("inputFechaLimiteEdit");
  let todoprioridadEdit = document.getElementById("todoprioridadEdit");
  let selectCategoria = document.getElementById("selectCategoria");

  todonameEdit.value = todo.getTitle;
  inputFechaLimiteEdit.value = todo.getDueDate;
  todoprioridadEdit.value = todo.getPriority;
  selectCategoria.value = todo.getProject;

  let categoriaId =
    selectCategoria.options[selectCategoria.selectedIndex].getAttribute(
      "datass"
    );

  let newCategoriaId = categoriaId;

  selectCategoria.addEventListener("change", () => {
    newCategoriaId =
      selectCategoria.options[selectCategoria.selectedIndex].getAttribute(
        "datass"
      );
  });

  let modificarTodo = () => {
    let nuevoProyecto = getProjectById(newCategoriaId);

    let proyectoActual = getProjectById(categoriaId);

    let origenTodoIndex = proyectoActual.todos.indexOf(todo);

    if (proyectoActual.id != 0 && nuevoProyecto.id != 0) {
      proyectoActual.todos.splice(origenTodoIndex, 1);
      nuevoProyecto.todos.push(todo);
      
    } else if (proyectoActual.id == 0 && nuevoProyecto != proyectoActual) {
      nuevoProyecto.todos.push(todo);
      
    } else if (proyectoActual.id != 0 && nuevoProyecto.id == 0) {
      proyectoActual.todos.splice(origenTodoIndex, 1);
      
    }

    todo.setTitle = todonameEdit.value;
    todo.setDueDate = inputFechaLimiteEdit.value;
    todo.setPriority = todoprioridadEdit.value;
    todo.setProject = selectCategoria.value;
    nuevaTareaForm.reset();
    modalEditarTarea.style.display = "none";
    modal.style.display = "none";

    renderTodos();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cambios guardados!",
      showConfirmButton: false,
      timer: 2000,
      heightAuto: false,
    });
  };

  let btnAceptarCambios = document.getElementById("btnAceptarCambios");
  btnAceptarCambios.addEventListener("click", modificarTodo, { once: true });
};

//ELIMINAR TAREA

let deleteTodo = (e) => {
  let todoIdFromLi = e.target.parentElement.parentElement.parentElement.id;
  let todo = getTodoById(todoIdFromLi);

  Swal.fire({
    title: "Estas seguro?",
    text: "Los cambios no se pueden revertir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Si, borrarlo!",
    reverseButtons: true,
    heightAuto: false,
  }).then((result) => {
    if (result.isConfirmed) {
      todosArray.splice(todosArray.indexOf(todo), 1);

      // Swal.fire("Borrado!", "La tarea ha sido eliminada.", "success");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tarea Eliminada!",
        showConfirmButton: false,
        timer: 2000,
        heightAuto: false,
      });
      renderTodos();
    }
  });

  //
};

//MARCAR TAREA COMO COMPLETADA

let completeStatus = (e) => {
  let todoFromLi = e.target.parentElement.parentElement;
  let todoIdFromLi = todoFromLi.id;
  let todo = getTodoById(todoIdFromLi);

  todo.completed = !todo.completed;

  renderTodos();
};

//funcion para cambiar variable de clase dependiendo de la prioridad

let colorPrioridad = (prioridad) => {
  if (prioridad == "Bajo") {
    return "priorityBajo";
  } else if (prioridad == "Medio") {
    return "priorityMedio";
  } else return "priorityAlto";
};

//funcion para formatear la fecha (solo para mostrar en pantalla)
let formatearFecha = (fechalimite) => {
  let fecha = new Date(fechalimite);

  fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());

  let fechaFormateada = fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return fechaFormateada;
};

//RENDERIZA LOS TODOS DEL ARRAY TODOSARRAY

export const renderTodos = (proyecto) => {
  //console.log(proyecto);
  if(proyecto == undefined){
    proyecto = projectsArray[0];
  }else{
    proyecto = proyecto.todos;
  }

  let tareas = document.getElementById("tareas");
  tareas.innerHTML = ``;

  if (todosArray.length == 0) {
    updateMenu();
    tareas.remove();

    let contentPrincipal = document.getElementById("contentPrincipal");
    let divMsg = document.createElement("div");
    divMsg.classList.add("divMsgTodosVacio");
    let todosVacioMsg = document.createElement("p");

    todosVacioMsg.classList.add("todosVacioMsg");
    todosVacioMsg.innerHTML = `No tienes ninguna tarea pendiente! <span id="svgOrigen">Crea una</span>`;

    divMsg.appendChild(todosVacioMsg);

    contentPrincipal.appendChild(divMsg);
  } else {    
    console.log(proyecto)
    proyecto.forEach((todo) => {
      let tareali = document.createElement("li");
      tareali.setAttribute("id", todo.id);

      //clase de prioridad dependiendo de la variable

      tareali.innerHTML = `<div class="todoLeft"><div class="todoPriority ${colorPrioridad(
        todo.priority
      )}"></div><input type="checkbox" title="checkCompleted" class="checkboxTodo"> <p class="todoTitle">${
        todo.title
      } </p></div><div class="todoRight"><p class="todoFecha" title="Fecha Límite">${formatearFecha(
        todo.dueDate
      )}</p> <div class="editDeleteContainer"> <div class="editTodoContainer" title="Editar"><i class="fa-solid fa-pen-to-square"></i></div><div class="deleteTodoContainer" title="Eliminar"><i class="fa-solid fa-trash"></i></div></div></div>`;
      let checkCompletedInput = tareali.querySelector(".checkboxTodo");

      let editBtn = tareali.querySelector(".editTodoContainer");
      editBtn.addEventListener("click", editTodo);

      let deleteBtn = tareali.querySelector(".deleteTodoContainer");
      deleteBtn.addEventListener("click", deleteTodo);

      checkCompletedInput.addEventListener("change", completeStatus);

      if (todo.completed) {
        let todoTitle = tareali.querySelector(".todoTitle");
        todoTitle.classList.add("completedTask");
        let todoFecha = tareali.querySelector(".todoFecha");
        todoFecha.classList.add("completedTask");
        let todoPriority = tareali.querySelector(".todoPriority");
        todoPriority.style.backgroundColor = "grey";
        editBtn.remove();

        checkCompletedInput.checked = true;
      }

      tareas.appendChild(tareali);
    });

    
    
  }
};

//TESTING
let ninguna = new Proyectos("Ninguna");
ninguna.todos = todosArray;
projectsArray.push(ninguna);

let tarea1 = new Todos("Ir al baño", "2024-03-02", "Alto");
let tarea2 = new Todos(
  "Practicar javascript orientado a objetos",
  "2023-02-28",
  "Medio"
);

let tarea3 = new Todos("Hacer judo", "1996-11-06", "Bajo");
let tarea4 = new Todos("Espiar a la unión sovietica", "1996-11-06", "Medio");
let tarea5 = new Todos("Ir al baño de nuevo", "1996-11-06", "Alto");
let tarea6 = new Todos("Hornear un pastel", "1996-11-06", "Bajo");
let tarea7 = new Todos("Practicar karate", "1996-11-06", "Alto");

todosArray.push(
  tarea1, tarea2, tarea3, tarea4, tarea5, tarea6, tarea7
);

renderTodos();
updateMenu();
