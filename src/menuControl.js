import { projectsArray, todosArray } from "./app";
import "./app";
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

//control de contador de todos

// let numberOfTodos = document.getElementById("numberOfTodos");

// export const updateTodosCount = () => {
//   numberOfTodos.innerText = `${todosArray.length}`;
// };

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
  let project = new Proyectos(inputValue);

  projectsArray.push(project);

  closeNewProjectFunction();

  updateMenu();

  let option = document.createElement("option");
  option.setAttribute("value", `${project.getNombre}`);
  option.setAttribute("datass", `${project.getId}`);
  option.innerHTML = `${project.getNombre}`;
  selectCategoria.append(option);
};

const nuevoProyecto = () => {
  addNuevaBtn.style.display = "none";
  projectInput.style.display = "flex";

  acceptNewProject.addEventListener("click", createProject);
};

addProjectBtn.addEventListener("click", nuevoProyecto);

const closeNewProjectFunction = () => {
  newProjectForm.reset();
  addNuevaBtn.style.display = "flex";
  projectInput.style.display = "none";
};

cancelNewProject.addEventListener("click", closeNewProjectFunction);

let dinamicUl = document.getElementById("dinamicUl");

export function updateMenu() {
  dinamicUl.innerHTML = ``;
  let mainLi = document.createElement("li");
  mainLi.classList.add("menuLi");
  mainLi.innerHTML = `<span><i class="fa-solid fa-circle"></i></span
    ><span class="menuTitle">Todos</span
    ><span class="numberOfTodos">${todosArray.length}</span>`;
  dinamicUl.appendChild(mainLi);

  projectsArray.forEach((project) => {
    if (project.id != 0) {
      let dinamicLi = document.createElement("li");
      dinamicLi.classList.add("menuLi");
      dinamicLi.innerHTML = `<span class="menuTitle">${project.getNombre}</span><span class="numberOfTodos"">${project.getTodos.length}</span>`;
      dinamicUl.appendChild(dinamicLi);
    }
  });
}
