let isEditing = false

document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("form-box")

    submitForm.addEventListener("submit", function (e){
        e.preventDefault();
        if (isEditing == true) {
            editBookData();
        } else {
            addBook();
        }
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