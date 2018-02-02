
var modal = document.getElementById("modal");
var sizeBtn = document.getElementById("btn");
var closeModal = document.getElementById ("close");
var overlay = document.getElementById("overlay");

    sizeBtn.addEventListener("click", function(event){
        event.preventDefault();
        modal.classList.add("modal__calculate--open");
        overlay.classList.add("overlay--open");
    });

closeModal.addEventListener("click", function(event){
    event.preventDefault();
    modal.classList.remove("modal__calculate--open");
    overlay.classList.remove("overlay--open");
});

overlay.addEventListener("click", function(event){
    event.preventDefault();
    modal.classList.remove("modal__calculate--open");
    overlay.classList.remove("overlay--open");
});

window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
        modal.classList.remove("modal__calculate--open");
        overlay.classList.remove("overlay--open");
        if (modal.classList.contains("modal__calculate--open")) {
            modal.classList.remove("modal__calculate--open");
            overlay.classList.remove("overlay--open");
        }
    }
});