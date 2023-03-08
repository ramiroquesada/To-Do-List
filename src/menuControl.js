import { projectsArray, todosArray, renderTodos } from "./app";

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

let abrirMenu = () => {
  menuAbierto.style.display = "flex";
  menuCerrado.style.display = "none";
  menuPrincipal.classList.add("menuOpened");
  contentPrincipal.classList.add("contentDetras");
};

menuCerrado.addEventListener("click", abrirMenu);

let cerrarMenu = () => {
  menuCerrado.style.display = "flex";
  menuAbierto.style.display = "none";
  menuPrincipal.classList.remove("menuOpened");
  contentPrincipal.classList.remove("contentDetras");
};

menuAbierto.addEventListener("click", cerrarMenu);

//cierra el menu si la ventana se agranda
window.addEventListener("resize", () => {
  if (document.documentElement.clientWidth > 900) {
    if (menuPrincipal.classList.contains("menuOpened")) {
      cerrarMenu();
    }
  }
});

export default class Proyectos {
  static id = 0;
  constructor(nombre) {
    this.id = Proyectos.id++;
    this.nombre = nombre;
    this.todos = [];
  }

  get getId() {
    return this.id;
  }

  get getNombre() {
    return this.nombre;
  }

  get getTodos() {
    return this.todos;
  }

  set setNombre(newName) {
    this.title = newName;
  }
}

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

  renderTodos(project);
  updateMenu(project);

  let option = document.createElement("option");
  option.setAttribute("value", `${project.getNombre}`);
  option.setAttribute("datass", `${project.getId}`);
  option.innerHTML = `${project.getNombre}`;
  selectCategoria.append(option);
};

const handleCreateProjectKey = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    createProject();
  }
};

const nuevoProyecto = () => {
  addNuevaBtn.style.display = "none";
  projectInput.style.display = "flex";

  acceptNewProject.addEventListener("click", createProject);
  projectNameInput.addEventListener("keydown", handleCreateProjectKey);
};

addProjectBtn.addEventListener("click", nuevoProyecto);

const closeNewProjectFunction = () => {
  newProjectForm.reset();
  addNuevaBtn.style.display = "flex";
  projectInput.style.display = "none";
};

cancelNewProject.addEventListener("click", closeNewProjectFunction);

let dinamicUl = document.getElementById("dinamicUl");
let circleIArray = [];

export function updateMenu(proyecto) {
  let projectIdForEventInTitle = projectsArray[0].id + 1000;

  let todosArrayUncompleted = todosArray.filter(
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

  if (proyecto == projectsArray[0]) {
    circleI.classList.add("menuProjectSelected");
  }

  if (projectsArray.length == 1) {
    circleI.classList.add("menuProjectSelected");
  }

  projectNameBtn.addEventListener("click", () => {
    renderTodos(projectsArray[0]);

    circleIArray.forEach((circle) => {
      circle.classList.remove("menuProjectSelected");
    });

    circleI.classList.add("menuProjectSelected");
  });

  projectsArray.forEach((project) => {
    if (project.id != 0) {
      let projectTodosUncompleted = project.getTodos.filter(
        (todos) => todos.completed == false
      );

      let projectIdForEventInTitle = project.id;

      let idForLi = project.id + 6000;

      let dinamicLi = document.createElement("li");
      dinamicLi.classList.add("menuLi");
      dinamicLi.setAttribute("id", `${projectIdForEventInTitle}`);
      dinamicLi.setAttribute("projectName", `${project.getNombre}`);
      dinamicLi.innerHTML = `<div class="projectMenuLeft"><span class="menuProjectCircle"><i class="fa-solid fa-circle" id="${idForLi}"></i></span><span class="menuTitle">${project.getNombre}</span></div><div class="projectMenuRight"><span class="numberOfTodos projectMenuRight">${projectTodosUncompleted.length}</span></div>`;

      dinamicUl.appendChild(dinamicLi);

      let projectNameBtn = document.getElementById(
        `${projectIdForEventInTitle}`
      );

      let circleI = document.getElementById(`${idForLi}`);

      circleIArray.push(circleI);

      if (project == proyecto) {
        circleI.classList.add("menuProjectSelected");
      }

      projectNameBtn.addEventListener("click", () => {
        renderTodos(project);

        circleIArray.forEach((circle) => {
          circle.classList.remove("menuProjectSelected");
        });
        circleI.classList.add("menuProjectSelected");
      });
    }
  });
}
