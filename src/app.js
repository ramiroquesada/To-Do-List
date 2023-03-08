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

export const circleIArray = [];

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

let todoname = document.getElementById("todoname");

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

  var now = new Date();
  now.setHours(now.getHours() - 24);
  var fechaActual = now.toISOString().slice(0, 10);

  if (fechalimite < fechaActual) {
    let timerInterval;
    Swal.fire({
      heightAuto: false,
      title: "La fecha debe ser igual o posterior a hoy!",
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




  const tarea = new Todos(todoname, fechalimite, todoprioridad);

  if (menuSeleccionado() != projectsArray[0]) {
    tarea.project = menuSeleccionado().nombre;
    menuSeleccionado().todos.push(tarea);
  }
  todosArray.push(tarea);

  renderTodos(menuSeleccionado());
  updateMenu(menuSeleccionado());

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

todoname.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    e.preventDefault();

  }
})


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
  let todonameEdit = document.getElementById("todonameEdit");
  let inputFechaLimiteEdit = document.getElementById("inputFechaLimiteEdit");
  let todoprioridadEdit = document.getElementById("todoprioridadEdit");
  let selectCategoria = document.getElementById("selectCategoria");

  let todoIdFromLi = e.target.parentElement.parentElement.parentElement.id;

  let todo = getTodoById(todoIdFromLi);

  modal.style.display = "block";
  modalNuevaTarea.style.display = "none";
  modalEditarTarea.style.display = "flex";



      
    

  

  todonameEdit.value = todo.getTitle;
  inputFechaLimiteEdit.value = todo.getDueDate;
  todoprioridadEdit.value = todo.getPriority;
  selectCategoria.value = todo.getProject;


  let defSelectedOption = todoprioridadEdit.options[todoprioridadEdit.selectedIndex];

    let defSelectedColorEd = getComputedStyle(defSelectedOption).backgroundColor;
    

    todoprioridadEdit.style.backgroundColor = defSelectedColorEd;

    

    todoprioridadEdit.addEventListener("change", () => {
    
    
    let selectedOptionEd = todoprioridadEdit.options[todoprioridadEdit.selectedIndex];
   
    let selectedColor = getComputedStyle(selectedOptionEd).backgroundColor;
   
    todoprioridadEdit.style.backgroundColor = selectedColor;
    });




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
    if (todonameEdit.value == "") {
      let timerInterval;
      Swal.fire({
        heightAuto: false,
        title: "La tarea debe tener un nombre!",
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

      btnAceptarCambios.removeEventListener("click", modificarTodo, {
        once: true,
      });

      btnAceptarCambios.addEventListener("click", modificarTodo, {
        once: true,
      });

      return;
    }



    if (todo.title != todonameEdit.value) {
      let todonameEditCampo = todonameEdit.value;

      let nombreTodoExistente = todosArray.some(
        (todoarr2) => todoarr2.title == todonameEditCampo
      );

      if (nombreTodoExistente) {
        let timerInterval;
        Swal.fire({
          heightAuto: false,
          title: "El nombre de la tarea no puede ser igual a otra",
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

        btnAceptarCambios.removeEventListener("click", modificarTodo, {
          once: true,
        });

        btnAceptarCambios.addEventListener("click", modificarTodo, {
          once: true,
        });

        return;
      }
      else{
        
      }
    }

   




    var now = new Date();
    now.setHours(now.getHours() - 24);
    var fechaActual = now.toISOString().slice(0, 10);
  
    if(todo.getDueDate != inputFechaLimiteEdit.value){
      if (inputFechaLimiteEdit.value < fechaActual) {
        let timerInterval;
        Swal.fire({
          heightAuto: false,
          title: "La fecha debe ser igual o posterior a hoy!",
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

        btnAceptarCambios.removeEventListener("click", modificarTodo, {
          once: true,
        });

        btnAceptarCambios.addEventListener("click", modificarTodo, {
          once: true,
        });
        return;
      }
      
    }
    
    
    


    todo.setDueDate = inputFechaLimiteEdit.value;
    todo.setTitle = todonameEdit.value;
    todo.setPriority = todoprioridadEdit.value;
    
    nuevaTareaForm.reset();
    modalEditarTarea.style.display = "none";
    modal.style.display = "none";

    let nuevoProyecto = getProjectById(newCategoriaId);

    let proyectoActual = getProjectById(categoriaId);

    let origenTodoIndex = proyectoActual.todos.indexOf(todo);

    if (proyectoActual.id != nuevoProyecto.id) {
      if (proyectoActual.id !== 0) {
        proyectoActual.todos.splice(origenTodoIndex, 1);
      }
      if (nuevoProyecto.id !== 0) {
        if (!nuevoProyecto.todos.includes(todo)){          
          nuevoProyecto.todos.push(todo);
        }       
        
      }
    }
    todo.setProject = nuevoProyecto.nombre;


    renderTodos(menuSeleccionado());
    updateMenu(menuSeleccionado());

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cambios guardados!",
      showConfirmButton: false,
      timer: 2000,
      heightAuto: false,
    });
    btnAceptarCambios.removeEventListener("click", modificarTodo);
  };

  let btnAceptarCambios = document.getElementById("btnAceptarCambios");
  btnAceptarCambios.addEventListener("click", modificarTodo, { once: true });
  todonameEdit.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
      e.preventDefault()
    }
  })
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
      let todoProjectName = todo.project;

      let todoProjectforDelete = projectsArray.find(
        (x) => x.nombre === todoProjectName
      );

      todosArray.splice(todosArray.indexOf(todo), 1);
      if (todoProjectforDelete.id > 0) {
        todoProjectforDelete.todos.splice(
          todoProjectforDelete.todos.indexOf(todo),
          1
        );
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tarea Eliminada!",
        showConfirmButton: false,
        timer: 2000,
        heightAuto: false,
      });
      renderTodos(menuSeleccionado());
      updateMenu(menuSeleccionado());
    }
  });

  //
};

//MARCAR TAREA COMO COMPLETADA
let compararPorPropiedad = (objeto1, objeto2) => {
  if (!objeto1.completed && objeto2.completed) {
    return -1;
  } else if (objeto1.completed && !objeto2.completed) {
    return 1;
  } else {
    return 0;
  }
};

export const menuSeleccionado = () => {
  let selectedCategoriaCircle = document.getElementsByClassName(
    "menuProjectSelected"
  );

  let selectedCategoriaLi =
    selectedCategoriaCircle[0].parentElement.parentElement.parentElement;

  let selectedProject = selectedCategoriaLi.getAttribute("projectname");

  let selected = projectsArray.find((x) => x.nombre === selectedProject);

  return selected;
};

let completeStatus = (e) => {
  let todoFromLi = e.target.parentElement.parentElement;
  let todoIdFromLi = todoFromLi.id;
  let todo = getTodoById(todoIdFromLi);

  todo.completed = !todo.completed;

  todosArray.sort(compararPorPropiedad);
  let projectArray = menuSeleccionado().todos;
  projectArray.sort(compararPorPropiedad);

  renderTodos(menuSeleccionado());
  updateMenu(menuSeleccionado());
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
  if (proyecto == undefined) {
    proyecto = projectsArray[0].todos;
  } else if (proyecto.id > 0) {
    proyecto = proyecto.todos;
  } else {
    proyecto = proyecto.todos;
  }

  let tareas = document.getElementById("tareas");

  if (tareas == null) {
    let contentPrincipal = document.getElementById("contentPrincipal");
    let ulTareas = document.createElement("ul");
    ulTareas.classList.add("tareas");
    ulTareas.setAttribute("id", "tareas");
    contentPrincipal.appendChild(ulTareas);
    tareas = ulTareas;
  }

  tareas.innerHTML = ``;

  if (proyecto.length === 0) {
    let contentPrincipal = document.getElementById("contentPrincipal");
    let divMsg2 = document.getElementById("divMsg");
    if (divMsg2) {
      divMsg2.remove();
    }

    tareas.remove();

    let divMsg = document.createElement("div");
    divMsg.classList.add("divMsgTodosVacio");
    divMsg.setAttribute("id", "divMsg");
    let todosVacioMsg = document.createElement("p");

    todosVacioMsg.classList.add("todosVacioMsg");

    if (todosArray.length > 0) {
      todosVacioMsg.innerHTML = `No tienes ninguna tarea pendiente en esta categoria!`;
    } else {
      todosVacioMsg.innerHTML = `No tienes ninguna tarea pendiente!`;
    }

    divMsg.appendChild(todosVacioMsg);

    contentPrincipal.appendChild(divMsg);
  } else {
    let divMsg = document.getElementById("divMsg");
    if (divMsg) {
      divMsg.remove();
    }

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
const ninguna = new Proyectos("Ninguna");
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
let tarea8 = new Todos("Ir a natación", "1996-11-06", "Alto");
let tarea9 = new Todos("Mirar la serie", "1996-11-06", "Medio");
let tarea10 = new Todos("nashe", "1996-11-06", "Medio");

todosArray.push(tarea1, tarea2, tarea3, tarea4, tarea5, tarea6, tarea7, tarea8, tarea9, tarea10);

renderTodos();
updateMenu();
