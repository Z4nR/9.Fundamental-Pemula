const STORAGE_KEY = "Book List";

let bookList = [];

function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsing = JSON.stringify(bookList);
    localStorage.setItem(STORAGE_KEY, parsing);
    document.dispatchEvent(new Event("onDataSaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null) {
        bookList = data;
    }

    document.dispatchEvent(new Event("onDataLoaded"));
}

function updateDataToStorage() {
    if (isStorageExist()) {
        saveData();
    }
}

function composeBookListObject(title, author, year, isCompleted) {
    return {
        id: `BOOK-${new Date().getTime()}`,
        title,
        author,
        year,
        isCompleted
    };
}

function findBook(bookID) {
    for(book of bookList){
        if (book.id === bookID) {
            return book;
        }
    }
    return null;
}

function findBookIndex(bookID) {
    let index = 0
    for(book of bookList){
        if (book.id === bookID) {
            return index;
        }
        index++;
    }
    return -1;
}