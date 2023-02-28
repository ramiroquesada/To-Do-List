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

  let todoprioridad = document.getElementById("todoprioridad").value;

  if (todoname == "" || fechalimite == "") {
    
    msgNuevaTarea.innerText = "Debe completar todos los campos";
    setTimeout(() => {
      msgNuevaTarea.innerText = "";
    }, 5000);

    return;
  }

  let tarea = new todos(todoname, fechalimite, todoprioridad);
  todosArray.push(tarea);
  renderTodos();

  nuevaTareaForm.reset();
  modal.style.display = "none";

  console.log(todosArray);
};

btnCrearTarea.addEventListener("click", crearTarea);


//OBTENER TODO POR ID


let getTodoById = (id)=> {
  return todosArray.find(function(todo) {
    return todo.id === id;
  });
}

//EDITAR TAREA


let editTodo = (e)=>{
  let todoIdFromLi = e.target.parentElement.parentElement.parentElement.id;
  
 
  
  let todo = getTodoById(todoIdFromLi);
  console.log(todo)
  console.log(todosArray)

  modal.style.display = "block";  
  modalNuevaTarea.style.display = "none"
  modalEditarTarea.style.display = "flex";


  let todonameEdit = document.getElementById("todonameEdit");
let inputFechaLimiteEdit = document.getElementById("inputFechaLimiteEdit");
let todoprioridadEdit = document.getElementById("todoprioridadEdit");
  
  todonameEdit.value = todo.getTitle;
  inputFechaLimiteEdit.value = todo.getDueDate;
  todoprioridadEdit.value = todo.getPriority;

  
  

  let modificarTodo = ()=>{
    todo.setTitle = todonameEdit.value;
    todo.setDueDate = inputFechaLimiteEdit.value;
    todo.setPriority = todoprioridadEdit.value;
    nuevaTareaForm.reset();
    modalEditarTarea.style.display = "none"
    modal.style.display = "none";

    renderTodos();
  }
    
  


  let btnAceptarCambios = document.getElementById("btnAceptarCambios");

  btnAceptarCambios.addEventListener("click", modificarTodo, {once: true});
}








//ELIMINAR TAREA

let deleteTodo = (e)=>{
  let todoIdFromLi = e.target.parentElement.parentElement.parentElement.id;
  let todo = getTodoById(todoIdFromLi);



  Swal.fire({
    title: 'Estas seguro?',
    text: "Los cambios no se pueden revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, borrarlo!',
  }).then((result) => {
    if (result.isConfirmed) {
      todosArray.splice(todosArray.indexOf(todo), 1);
      
  
      Swal.fire(
        'Borrado!',
        'La tarea ha sido eliminada.',
        'success'
      )
      renderTodos();
      
    }
  })

 // 
  

  
}

















//funcion para cambiar variable de clase dependiendo de la prioridad

let colorPrioridad = (prioridad)=>{
  if (prioridad == "Bajo"){
    return "priorityBajo"
  }
  else if (prioridad == "Medio"){
    return "priorityMedio"
  }
  else return "priorityAlto"
}


//funcion para formatear la fecha (solo para mostrar en pantalla)
let formatearFecha = (fechalimite)=>{
let fecha = new Date(fechalimite);

fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());

let fechaFormateada = fecha.toLocaleDateString("es-ES", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

return fechaFormateada;

}




//RENDERIZA LOS TODOS DEL ARRAY TODOSARRAY

let renderTodos = () => {
  tareas.innerHTML = ``;

  todosArray.forEach((todo) => {
    
    let tareali = document.createElement("li");
    tareali.setAttribute("id", todo.id);

    //clase de prioridad dependiendo de la variable
    
    
    tareali.innerHTML = `<div class="todoLeft"><div><input type="checkbox" title="checkCompleted"  class="checkboxTodo"></div> <p class="todoTitle">${todo.title}</p></div><div class="todoRight"><p class="todoFecha" title="Fecha Límite">${formatearFecha(todo.dueDate)}</p> <p class="todoPriority ${colorPrioridad(todo.priority)}" title="Prioridad">${todo.priority}</p><div class="editDeleteContainer"> <div class="editTodoContainer" title="Editar"><i class="fa-solid fa-pen-to-square"></i></div><div class="deleteTodoContainer" title="Eliminar"><i class="fa-solid fa-trash"></i></div></div></div>`;


    let editBtn = tareali.querySelector(".editTodoContainer");
    editBtn.addEventListener("click", editTodo);
    
    let deleteBtn = tareali.querySelector(".deleteTodoContainer");
    deleteBtn.addEventListener("click", deleteTodo)
    
    tareas.appendChild(tareali);

  });




};

//TESTING

let tarea1 = new todos("Ir al baño", "2024-03-02", "Alto");
let tarea2 = new todos(
  "Hola mi nombre es jesus y me gusta aprender javascript nashe",
  "2023-02-28",
  "Medio"
);

let tarea3 = new todos("Hacer kaka", "1996-11-06", "Bajo")
todosArray.push(tarea1, tarea2, tarea3);
renderTodos();







