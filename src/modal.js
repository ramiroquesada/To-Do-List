

let modal = document.getElementById('modal');

let abrirModalAgregarTarea = document.getElementById('btnAgregarTarea');

let cerrarModal = document.getElementById('cerrarModal');

let modalEditarTarea = document.getElementById('modalEditarTarea');

let modalNuevaTarea = document.getElementById('modalNuevaTarea');

let nuevaTareaForm = document.getElementById("nuevaTareaForm");

let msgNuevaTarea = document.getElementById("msgNuevaTarea");





















abrirModalAgregarTarea.addEventListener('click', ()=>{
    modal.style.display = "block";    
    modalNuevaTarea.style.display = "flex";
    modalEditarTarea.style.display = "none";
})

cerrarModal.addEventListener('click', ()=>{
    modalNuevaTarea.style.display = "none"
    modal.style.display = "none";
    
    
})

