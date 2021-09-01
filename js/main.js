document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("form-box")

    submitForm.addEventListener("submit", function (e){
        e.preventDefault();
        addBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }

});

document.addEventListener("onDataSaved", () => {
    console.log("Data Berhasil Disimpan");
});

document.addEventListener("onDataLoaded", () =>{
    refreshDataFromBookList();
})