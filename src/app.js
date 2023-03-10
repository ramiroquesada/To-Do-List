import "./reset.css";
import "./styles.css";
import "./modal.css";

import "./modal";

import Todos from "./tareas";

import Proyectos from "./menuControl.js";

import { updateMenu } from "./menuControl.js";

import "./menuControl";



export const circleIArray = [];



export let projectsArray = [];



//manejador de LocalStorage rama

document.addEventListener("DOMContentLoaded", () => {
  let projects = JSON.parse(localStorage.getItem("projects"));
  let project0 = JSON.parse(localStorage.getItem("project0"));

  let projectsArrayNuevo =  [];

  if (projectsArray.length == 0 && projects == null) {
    projectsArrayNuevo = project0;
  } else if (projectsArray.length == 0 && projects != null) {
    projectsArrayNuevo = [...project0]; 
  }else{
    projectsArrayNuevo = projectsArray;
  }

  projectsArray = projectsArrayNuevo;
  app();
  projectsArray.forEach((proyect)=>{
    if(proyect.id>0 ){
      proyect.todos = [];
    }
  })

  if(projectsArray[0].todos.length > 0){
    let allTodos = projectsArray[0].todos;
    console.log("allTodos")
    console.log(allTodos)
     allTodos.forEach((todo1)=>{
    let todoProy = todo1.project;

    let proyMatch = projectsArray.find((proyect)=>{
      proyect.nombre == todoProy;
      
    });
    console.log(proyMatch)
    
    //proyMatch.todos.push(todo1);
  })}else{console.log("no")}
  

  
  console.log("projectsArray dom loaded")
  console.log(projectsArray)

  let selectCategoria = document.getElementById("selectCategoria");

  

  projectsArray.forEach((project) => {
    if (project.id > 0) {
      let option = document.createElement("option");
      option.setAttribute("value", `${project.nombre}`);
      option.setAttribute("datass", `${project.id}`);
      option.innerHTML = `${project.nombre}`;
      selectCategoria.append(option);
    }
  });

  renderTodos();
  updateMenu();
});

export let saveToLocalStorage = () => {
 
  let projectsX = [];
  let project0 = [];

  projectsArray.forEach((project) => {
    if (project.id > 0) {
      projectsX.push(project);
    } else if (project.id == 0) {
      project0.push(project);
    }
  });
  localStorage.setItem("project0", JSON.stringify(project0));
  localStorage.setItem("projects", JSON.stringify(projectsX));

  console.log("saveToStorage")
  console.log(projectsArray);

  
  
}

// iniciaiza el proyecto 0 si no existe
let app = () => {
  if (projectsArray == null) {
    const ninguna = new Proyectos("Ninguna");
    projectsArray = [];
    ninguna.id = 0;
    projectsArray.push(ninguna);
  }
};

//cambia el nombre de pestaña cuando se va para llamar la atención del usuario

let tituloPrevio = document.title;

window.addEventListener("blur", () => {
  tituloPrevio = document.title;
  document.title = "No te vayas 😢";
});

window.addEventListener("focus", () => {
  document.title = tituloPrevio;
});

// Creacion de nueva tarea

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
  let project0 = projectsArray[0].todos;
  project0.push(tarea);

  todosSort();

  renderTodos(menuSeleccionado());
  updateMenu(menuSeleccionado());
  saveToLocalStorage();

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

todoname.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

//OBTENER TODO POR ID

let getTodoById = (id) => {
  let project0 = projectsArray[0].todos;

  return project0.find(function (todo) {
    return todo.id === id;
  });
};

//OBTENER PROYECTO POR ID

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

  todonameEdit.value = todo.title;
  inputFechaLimiteEdit.value = todo.dueDate;
  todoprioridadEdit.value = todo.priority;
  selectCategoria.value = todo.project;

  let defSelectedOption =
    todoprioridadEdit.options[todoprioridadEdit.selectedIndex];

  let defSelectedColorEd = getComputedStyle(defSelectedOption).backgroundColor;

  todoprioridadEdit.style.backgroundColor = defSelectedColorEd;

  todoprioridadEdit.addEventListener("change", () => {
    let selectedOptionEd =
      todoprioridadEdit.options[todoprioridadEdit.selectedIndex];

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

      let project0 = projectsArray[0].todos;

      let nombreTodoExistente = project0.some(
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
      } else {
      }
    }

    var now = new Date();
    now.setHours(now.getHours() - 24);
    var fechaActual = now.toISOString().slice(0, 10);

    if (todo.dueDate != inputFechaLimiteEdit.value) {
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

    todo.dueDate = inputFechaLimiteEdit.value;
    todo.title = todonameEdit.value;
    todo.priority = todoprioridadEdit.value;

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
        if (!nuevoProyecto.todos.includes(todo)) {
          nuevoProyecto.todos.push(todo);
        }
      }
    }
    todo.project = nuevoProyecto.nombre;

    todosSort();
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
  todonameEdit.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
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

      let project0 = projectsArray[0].todos;
      project0.splice(project0.indexOf(todo), 1);
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
      
      saveToLocalStorage();
      renderTodos(menuSeleccionado());
      updateMenu(menuSeleccionado());
    }
  });

  //
};

// FUNCION PARA RETORNAR EL PROYECTO QUE ESTA SELECCIONADO
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


// COMPARADOR DE TODOS COMPLETADOS PARA EL SORT
let compararPorCompleted = (objeto1, objeto2) => {
  if (!objeto1.completed && objeto2.completed) {
    return -1;
  } else if (objeto1.completed && !objeto2.completed) {
    return 1;
  } else {
    return 0;
  }
};

// COMPARADOR DE FECHA LIMITE DE TODOS PARA EL SORT
let compararPorDueDate = (objeto1, objeto2) => {
  if (objeto1.dueDate < objeto2.dueDate) {
    return -1;
  } else if (objeto1.dueDate > objeto2.dueDate) {
    return 1;
  } else {
    return 0;
  }
};

let prioridadToNumber = (todo) => {
  let prioridad = todo.priority;

  if (!prioridad) {
    throw new Error('La propiedad "prioridad" no está definida');
  }

  switch(prioridad){
    case "Bajo": return 1;    
    
    case "Medio": return 2;

    case "Alto": return 3;
    default: throw new Error(`La prioridad "${prioridad}" no es válida`);
  }
}

// COMPARADOR DE FECHA LIMITE DE TODOS PARA EL SORT
let compararPorPrioridad = (objeto1, objeto2) => {
  
  if (prioridadToNumber(objeto1) > prioridadToNumber(objeto2)) {
    return -1;
  } else if (prioridadToNumber(objeto1) < prioridadToNumber(objeto2)) {
    return 1;
  } else {
    return 0;
  }
};






// FUNCION PARA HACER EL SORT Y PONER LOS TODOS COMPLETADOS AL FINAL
export const todosChekedSort = () => {
  let project0 = projectsArray[0].todos;

  project0.sort(compararPorCompleted);
  let projectArray = menuSeleccionado().todos;
  console.log(menuSeleccionado().todos)
  
  projectArray.sort(compararPorCompleted);
};

//FUNCION PARA HACER EL SORT DE LOS TODOS POR SU FECHA LIMITE
export const todosDueDateSort = () => {
  let project0 = projectsArray[0].todos;

  project0.sort(compararPorDueDate);
  let projectArray = menuSeleccionado().todos;
  projectArray.sort(compararPorDueDate);
};

//FUNCION PARA HACER EL SORT DE LOS TODOS POR SU PRIORIDAD
export const todoPrioritySort = () => {
  let project0 = projectsArray[0].todos;

  project0.sort(compararPorPrioridad);
  let projectArray = menuSeleccionado().todos;
  projectArray.sort(compararPorPrioridad);
};

// FUNCION PARA HACER TODOS LOS SORTS EN ORDEN

export const todosSort = () => {
  todosDueDateSort();
  todoPrioritySort();
  
  todosDueDateSort();
  todosChekedSort();
}




// FUNCIÓN PARA MARCAR/DESMARCAR UN TODO COMO COMPLETADO
let completeStatus = (e) => {
  let todoFromLi = e.target.parentElement.parentElement;
  let todoIdFromLi = todoFromLi.id;
  let todo = getTodoById(todoIdFromLi);
  
  todo.completed = !todo.completed;

  
  todosSort();
  
  renderTodos(menuSeleccionado());
  updateMenu(menuSeleccionado());
  saveToLocalStorage();
  
};

//FUNCION PARA CAMBIAR LA VARIABLE DE CLASE DEPENDIENDO LA PRIORIDAD DEL TODO
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

//RENDERIZA LOS TODOS DEL ARRAY projectsArray[0].todos o el proyecto que se le pase como parametro

export const renderTodos = (proyecto) => {
  if (proyecto == undefined) {
    proyecto = projectsArray[0].todos;
  } else if (proyecto.id > 0) {
    proyecto = proyecto.todos;
    
    console.log("render todos proyecto id > 0");
    console.log(proyecto);
  } else {
    proyecto = proyecto.todos;
    console.log("render todos proyecto else");
    console.log(proyecto);
  }

  
  //saveToLocalStorage();

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

    let project0 = projectsArray[0].todos;

    if (project0.length > 0) {
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
      } </p></div><div class="todoRight"><p class="todoProyectName">${
        todo.project
      }</p><p class="todoFecha" title="Fecha Límite">${formatearFecha(
        todo.dueDate
      )}</p> <div class="editDeleteContainer"> <div class="editTodoContainer" title="Editar"><i class="fa-solid fa-pen-to-square"></i></div><div class="deleteTodoContainer" title="Eliminar"><i class="fa-solid fa-trash"></i></div></div></div>`;
      
      let checkCompletedInput = tareali.querySelector(".checkboxTodo");

      let editBtn = tareali.querySelector(".editTodoContainer");
      editBtn.addEventListener("click", editTodo);

      let deleteBtn = tareali.querySelector(".deleteTodoContainer");
      deleteBtn.addEventListener("click", deleteTodo);

      let pProyectName = tareali.querySelector(".todoProyectName");
      if (todo.project == "Ninguna") {
        pProyectName.remove();
      }

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
      //saveToLocalStorage();
    });
    //todosSort();
    //saveToLocalStorage()
  }
};
