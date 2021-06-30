document.addEventListener("DOMContentLoader", function () {

    const submitForm = document.getElementById("form-box")

    submitForm.addEventListener("submit", function (){
        Event.preventDefault();
        addBook();
    });

});