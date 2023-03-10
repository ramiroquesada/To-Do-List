import { projectsArray, renderTodos, todosSort } from "./app";

import "./styles.css";

let menuCerrado = document.getElementById("menuCerrado");
let menuAbierto = document.getElementById("menuAbierto");

let menuPrincipal = document.getElementById("menuPrincipal");

let contentPrincipal = document.getElementById("contentPrincipal");

let addProjectBtn = document.getElementById("addProjectBtn");
let projectInput = document.getElementById("projectInput");
let addNuevaBtn = document.getElementById("addNuevaBtn");
let cancelNewProject = document.getElementById("cancelNewProject");
let acceptNewProject = document.getElementById("acceptNewProject");
let newProjectForm = document.getElementById("newProjectForm");
let projectNameInput = document.getElementById("projectName");

// FUNCION PARA ABRIR EL MENU (SOLO EN MOBILE)
let abrirMenu = () => {
  menuAbierto.style.display = "flex";
  menuCerrado.style.display = "none";
  menuPrincipal.classList.add("menuOpened");
  contentPrincipal.classList.add("contentDetras");
};

menuCerrado.addEventListener("click", abrirMenu);

// FUNCION PARA CERRAR EL MENU (SOLO EN MOBILE)
let cerrarMenu = () => {
  menuCerrado.style.display = "flex";
  menuAbierto.style.display = "none";
  menuPrincipal.classList.remove("menuOpened");
  contentPrincipal.classList.remove("contentDetras");
};

menuAbierto.addEventListener("click", cerrarMenu);

//EVENT LISTENER PARA CERRAR EL MENU SI EL WIDTH DE LA VENTANA ES > 900
window.addEventListener("resize", () => {
  if (document.documentElement.clientWidth > 900) {
    if (menuPrincipal.classList.contains("menuOpened")) {
      cerrarMenu();
    }
  }
});

// CLASE PARA CREACION DE PROYECTOS
export default class Proyectos {
  static id = 1;
  constructor(nombre) {
    this.id = Proyectos.id++;
    this.nombre = nombre;
    this.todos = [];
  }
}

// FUNCION PARA CREAR UN NUEVO PROYECTO
let selectCategoria = document.getElementById("selectCategoria");

const createProject = () => {
  let inputValue = projectNameInput.value;

  if (inputValue == "") {
    let timerInterval;
    Swal.fire({
      heightAuto: false,
      title: "Debe tener un nombre!",
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

  let nombreDeTareaExistente = projectsArray.some(
    (project) => project.nombre == inputValue
  );

  if (nombreDeTareaExistente) {
    let timerInterval;
    Swal.fire({
      heightAuto: false,
      title: "El nombre no puede ser igual al de otro proyecto",
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

  const project = new Proyectos(inputValue);

  project.id = projectsArray.length;

  projectsArray.push(project);

  closeNewProjectFunction();

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Categoría creada!",
    showConfirmButton: false,
    timer: 2000,
    heightAuto: false,
  });
  todosSort();
  renderTodos(project);
  updateMenu(project);

  let option = document.createElement("option");
  option.setAttribute("value", `${project.nombre}`);
  option.setAttribute("datass", `${project.id}`);
  option.innerHTML = `${project.nombre}`;
  selectCategoria.append(option);
};

const handleCreateProjectKey = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    createProject();
  }
};

// FUNCION PARA MOSTRAR EL FORMULARIO DE CREACION DE PROYECTO
const nuevoProyecto = () => {
  addNuevaBtn.style.display = "none";
  projectInput.style.display = "flex";

  acceptNewProject.addEventListener("click", createProject);
  projectNameInput.addEventListener("keydown", handleCreateProjectKey);
};

addProjectBtn.addEventListener("click", nuevoProyecto);

// FUNCION PARA CERRAR EL FORMULARIO DEE CREACION DE PROYECTO
const closeNewProjectFunction = () => {
  newProjectForm.reset();
  addNuevaBtn.style.display = "flex";
  projectInput.style.display = "none";
};

cancelNewProject.addEventListener("click", closeNewProjectFunction);

// FUNCION PARA ELIMINAR UN PROYECTO (CON TODOS SUS TODOS)

const deleteProject = (proyecto) => {
  console.log(proyecto);
  let project1 = proyecto;
  Swal.fire({
    heightAuto: false,
    title: "Estas seguro?",
    text: "Se borraran todas las tareas del proyecto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Borrar Proyecto!",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      let proyectoTodos = project1.todos;

      proyectoTodos.forEach((todo) => {
        let project0 = projectsArray[0].todos;

        let indexTodoInAllTodos = project0.indexOf(todo);
        project0.splice(indexTodoInAllTodos, 1);
      });

      const opcionAEliminar = selectCategoria.querySelector(
        `option[value="${project1.nombre}"]`
      );
      console.log(opcionAEliminar);
      opcionAEliminar.remove();

      let indexOfProyecto = projectsArray.indexOf(proyecto);
      projectsArray.splice(indexOfProyecto, 1);

      renderTodos(projectsArray[0]);
      updateMenu(projectsArray[0]);

      Swal.fire({
        heightAuto: false,
        title: "Proyecto borrado",
        icon: "success",
      });
    }
  });
};

//FUNCION PARA RENDERIZAR EL MENU
let circleIArray = [];
let dltBtnArray = [];
let dinamicUl = document.getElementById("dinamicUl");

export function updateMenu(proyecto) {
  let projectIdForEventInTitle = projectsArray[0].id + 1000;

  let project0 = projectsArray[0].todos;

  let todosArrayUncompleted = project0.filter(
    (todos) => todos.completed == false
  );

  dinamicUl.innerHTML = ``;
  let mainLi = document.createElement("li");
  mainLi.classList.add("menuLi");
  mainLi.setAttribute("id", `${projectIdForEventInTitle}`);
  mainLi.setAttribute("projectName", `Ninguna`);
  mainLi.innerHTML = `<div class="projectMenuLeft"><span class="menuProjectCircle"><i class="fa-solid fa-circle" id="iCircleI"></i></span><span class="menuTitle" >Todos</span
    ></div><div class="projectMenuRight"><span class="numberOfTodos">${todosArrayUncompleted.length}</span></div>`;

  dinamicUl.appendChild(mainLi);

  let projectNameBtn = document.getElementById(`${projectIdForEventInTitle}`);

  let circleI = document.getElementById(`iCircleI`);

  circleIArray.push(circleI);

  if (proyecto === undefined) {
    proyecto = projectsArray[0];
  }

  if (proyecto == projectsArray[0]) {
    circleI.classList.add("menuProjectSelected");
    todosSort();
  }

  if (projectsArray.length == 1) {
    circleI.classList.add("menuProjectSelected");
    todosSort();
  }

  projectNameBtn.addEventListener("click", () => {
    renderTodos(projectsArray[0]);

    circleIArray.forEach((circle) => {
      circle.classList.remove("menuProjectSelected");
    });
    dltBtnArray.forEach((xBtn) => {
      xBtn.classList.remove("btnDltHidden");
    });

    circleI.classList.add("menuProjectSelected");
    todosSort();
  });

  projectsArray.forEach((project) => {
    if (project.id != 0) {
      let projectTodosUncompleted = [];
      if (project.todos.length > 0) {
        projectTodosUncompleted = project.todos.filter(
          (todos) => todos.completed == false
        );
      }

      let projectIdForEventInTitle = project.id;

      let idForLi = project.id + 6000;
      let idForDeleteBtn = project.id + 12000;
      let dinamicLi = document.createElement("li");
      dinamicLi.classList.add("menuLi");
      dinamicLi.setAttribute("id", `${projectIdForEventInTitle}`);
      dinamicLi.setAttribute("projectName", `${project.nombre}`);
      dinamicLi.innerHTML = `<div class="projectMenuLeft"><span class="menuProjectCircle"><i class="fa-solid fa-circle" id="${idForLi}"></i></span><span class="menuTitle">${project.nombre}</span></div><div class="projectMenuRight"> <span class="numberOfTodos">${projectTodosUncompleted.length}</span><span class="deleteCategoryBtn" id="${idForDeleteBtn}"><i class="fa-regular fa-circle-xmark xMarkCategoria"></i></span></div>`;

      dinamicUl.appendChild(dinamicLi);

      let projectNameBtn = document.getElementById(
        `${projectIdForEventInTitle}`
      );

      let circleI = document.getElementById(`${idForLi}`);

      circleIArray.push(circleI);

      let deleteProjectBtn = document.getElementById(`${idForDeleteBtn}`);
      dltBtnArray.push(deleteProjectBtn);

      deleteProjectBtn.addEventListener("click", () => {
        deleteProject(project);
      });

      if (project == proyecto) {
        circleI.classList.add("menuProjectSelected");
        deleteProjectBtn.classList.add("btnDltHidden");
      }

      projectNameBtn.addEventListener("click", () => {
        renderTodos(project);

        circleIArray.forEach((circle) => {
          circle.classList.remove("menuProjectSelected");
        });
        circleI.classList.add("menuProjectSelected");
        todosSort();

        dltBtnArray.forEach((xBtn) => {
          xBtn.classList.remove("btnDltHidden");
        });
        deleteProjectBtn.classList.add("btnDltHidden");
      });
    }
  });
}
