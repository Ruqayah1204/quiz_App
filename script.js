"use strict"

const button = document.querySelector('#openButton');
const mobileButton = document.querySelector('#openModalButton');
const modal = document.getElementById('modal');
const modalContent = document.getElementById("modalContent")

//Clicking the button to open and close the instruction modal
function openModal() {
    modal.style.display = "flex";
};
function closeModal () {
    modal.style.display = "none";
}
button.addEventListener('click', () =>{
    openModal()
});
mobileButton.addEventListener('click', () =>{
    openModal()
});
modalContent.addEventListener('click', (e) => {
    e.stopPropagation()
});

modal.addEventListener('click', closeModal);


