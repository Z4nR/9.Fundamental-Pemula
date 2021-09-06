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

function updateData(bookID, newTitle, newPage, newAuthor, newYear, newIsCompleted) {
    bookList.every( book => {
        if (book.id == bookID ) {
            book.title = newTitle;
            book.page = newPage;
            book.author = newAuthor;
            book.year = newYear;
            book.isCompleted = newIsCompleted;
            return false
        }
        return true
    })
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

function composeBookObject(id, title, page, author, year, isCompleted) {
    return {
        id,
        title,
        page,
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

function refreshDataFromBookList() {
    const unreadBook = document.getElementById(LIST_UNREAD_BOOK);
    const readBook = document.getElementById(LIST_READ_BOOK);

    for(book of bookList){
        const bookList = makeListBook(book.id, book.title, book.page, book.author, book.year, book.isCompleted);
        bookList[BOOK_ID] = book.id;

        if (book.isCompleted) {
            readBook.append(bookList);
        } else {
            unreadBook.append(bookList);
        }
    }
}