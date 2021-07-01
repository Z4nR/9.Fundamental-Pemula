document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("form-box")

    submitForm.addEventListener("submit", function (e){
        e.preventDefault();
        addBook();
    });

});