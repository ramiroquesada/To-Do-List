let modal = document.getElementById('modal');

let abrirModal = document.getElementById('btnAgregarTarea');

let cerrarModal = document.getElementById('cerrarModal')

abrirModal.addEventListener('click', ()=>{
    modal.style.display = "block";
})

cerrarModal.addEventListener('click', ()=>{
    modal.style.display = "none"
})

