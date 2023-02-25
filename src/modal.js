let modal = document.getElementById('modal');

let abrirModalAgregarTarea = document.getElementById('btnAgregarTarea');

let cerrarModal = document.getElementById('cerrarModal');

let modalEditarTarea = document.getElementById('modalEditarTarea');

let modalNuevaTarea = document.getElementById('modalNuevaTarea');


abrirModalAgregarTarea.addEventListener('click', ()=>{
    modal.style.display = "block";    
    modalNuevaTarea.style.display = "flex";
    modalEditarTarea.style.display = "none";
})

cerrarModal.addEventListener('click', ()=>{
    modal.style.display = "none";
    
    
})

