const LIST_UNREAD_BOOK = "unread-book";
const LIST_READ_BOOK = "read-book";
const SEARCH_BOOK = "find-book"
const BOOK_ID = "bookID";

function addBook() {

    const unreadBook = document.getElementById(LIST_UNREAD_BOOK);
    const readBook = document.getElementById(LIST_READ_BOOK);

    const date = new Date().getTime();
    const bookId = `BOOK-${date}`;
    const bookName = document.getElementById("book-name").value;
    const bookPage = document.getElementById("book-page").value;
    const bookAuthor = document.getElementById("book-author").value;
    const bookYear = document.getElementById("book-year").value;
    const bookCheck = document.querySelector('input[type=checkbox]').checked;

    const book = makeListBook(bookId, bookName, bookPage, bookAuthor, bookYear, bookCheck);
    const bookObject = composeBookObject(bookId, bookName, bookPage, bookAuthor, bookYear, bookCheck);

    book[BOOK_ID] = bookObject.id;
    bookList.push(bookObject);

    if (bookCheck) {
        readBook.append(book);
    } else {
        unreadBook.append(book);
    }

    document.getElementById("book-name").value = '';
    document.getElementById("book-page").value = '';
    document.getElementById("book-author").value = '';
    document.getElementById("book-year").value = '';
    document.querySelector('input[type=checkbox]').checked = false;

    updateDataToStorage();

}

function makeListBook(id, title, page, author, year, isCompleted) {
    
    const bookId = document.createElement("h6");
    bookId.innerText = id;

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const pageTitle = "Halaman terakhir : "
    const bookPage = document.createElement("p");
    bookPage.classList.add("page")
    bookPage.innerText = pageTitle + page;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("author")
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.classList.add("year")
    bookYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if (isCompleted) {
        textContainer.append(bookId, bookTitle, "", bookAuthor, bookYear);
        container.append(
            undoButton(),
            editButton(),
            trashButton()
        );
    } else {
        textContainer.append(bookId, bookTitle, bookPage, bookAuthor, bookYear);
        container.append(
            checkButton(),
            editButton(),
            trashButton()
        );
    }

    return container;

}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event){
        eventListener(event);     
    });

    return button;
}

function addBookToCompleted(bookElement) {
    const bookID = bookElement.querySelector(".inner > h6").innerText;
    const bookTitle = bookElement.querySelector(".inner > h3").innerText;
    const bookAuthor = bookElement.querySelector(".inner > .author").innerText;
    const bookYear = bookElement.querySelector(".inner > .year").innerText;

    const readBook = makeListBook(bookID, bookTitle, "", bookAuthor, bookYear, true);
    
    const book = findBook(bookElement[BOOK_ID]);
    book.isCompleted = true;
    readBook[BOOK_ID] = book.id;

    const bookCompleted = document.getElementById(LIST_READ_BOOK);
    bookCompleted.append(readBook);

    bookElement.remove();
    updateDataToStorage();
}

function showEditDataBook(bookElement) {
    const book = findBook(bookElement[BOOK_ID]);
    editedBook = book;

    document.getElementById("book-name").value = book.title;
    document.getElementById("book-page").value = book.page;
    document.getElementById("book-author").value = book.author;
    document.getElementById("book-year").value = book.year;
    document.querySelector('input[type=checkbox]').checked = book.isCompleted;
}

function editBookData() {
    const title = document.getElementById("book-name").value;
    const page = document.getElementById("book-page").value;
    const author = document.getElementById("book-author").value;
    const year = document.getElementById("book-year").value;
    const check = document.querySelector('input[type=checkbox]').checked;
    
    bookList.every(book => {
        if (book.id == editedBook.id) {
            book.title = title;
            book.page = page;
            book.author = author;
            book.year = year;
            book.isCompleted = check;
            return false
        }
        return true
    })

    updateDataToStorage();
}

refreshDataFromBookList();

function undoBookToCompleted(bookElement) {
    const book = findBook(bookElement[BOOK_ID]);

    const bookID = bookElement.querySelector(".inner > h6").innerText;
    const bookTitle = bookElement.querySelector(".inner > h3").innerText;
    const bookPage = book.page;
    const bookAuthor = bookElement.querySelector(".inner > .author").innerText;
    const bookYear = bookElement.querySelector(".inner > .year").innerText;

    const readBook = makeListBook(bookID, bookTitle, bookPage, bookAuthor, bookYear, false);
    
    book.isCompleted = false;
    readBook[BOOK_ID] = book.id;

    const bookCompleted = document.getElementById(LIST_UNREAD_BOOK);
    bookCompleted.append(readBook);

    bookElement.remove();
    updateDataToStorage();
}

function removeBookFromCompleted(bookElement) {

    Swal.fire({
        title: 'Serius?',
        text: "Tindakan ini tidak bisa diulangi!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#05a3ff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aku ingin menghapusnya!'
    }).then((result) => {
        if (result.isConfirmed) {
            const bookPosition = findBookIndex(bookElement[BOOK_ID]);
            bookList.splice(bookPosition, 1);

            bookElement.remove();
            updateDataToStorage();

            Swal.fire(
                'Terhapus!',
                'Selamat bukumu sudah hilang.',
                'success'
            )
        }
    })

}

function makeSearchList(books) {
    const container = document.createElement("div");
    container.classList.add("result-search")

    books.forEach(book => {
        const bookId = document.createElement("h6");
        bookId.innerText = book.id;

        const bookTitle = document.createElement("h3");
        bookTitle.innerText = book.title;

        const bookPage = document.createElement("p");
        bookPage.innerText = book.page;
        
        const bookAuthor = document.createElement("p");
        bookAuthor.innerText = book.author;

        const bookYear = document.createElement("p");
        bookYear.classList.add("year")
        bookYear.innerText = book.year;

        const textContainer = document.createElement("div");
        textContainer.classList.add("inner-search")

        textContainer.classList.add("item", "item-search", "shadow")
        container.append(textContainer);

        if (book.isCompleted) {
            textContainer.append(bookId, bookTitle, bookAuthor, bookYear);
        } else {
            textContainer.append(bookId, bookTitle, bookPage, bookAuthor, bookYear);
        }
    });
    
    return container;
}

function searchBookFromStorage() {
    const search = document.getElementById(SEARCH_BOOK);
    const bookName = document.getElementById("search-box").value;
    const bookCheck = document.getElementById("search-checkbox").checked;
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let book = JSON.parse(serializedData);
    const foundBook = book.filter(bookTitle => bookTitle.title == bookName && bookTitle.isCompleted == bookCheck);

    if (foundBook) {
        const bookList = makeSearchList(foundBook);
        search.innerHTML = '';
        search.append(bookList);
    } else {
        search.innerHTML = '';
        Swal.fire(
            'Bukumu tidak ada?',
            'Mungkin kamu lupa, ayo cari lagi!!',
            'question'
            )
    }
    
    document.getElementById("search-box").value = '';
    document.getElementById("search-checkbox").checked = false;
}

function checkButton() {
    return createButton("check-button", function (event) {
        addBookToCompleted(event.target.parentElement);
    });
}

function undoButton() {
    return createButton("undo-button", function (event) {
        undoBookToCompleted(event.target.parentElement);
    });
}

function trashButton() {
    return createButton("trash-button", function (event) {
        removeBookFromCompleted(event.target.parentElement);
    });
}

function editButton() {
    return createButton("edit-button", function (event) {
        showEditDataBook(event.target.parentElement);
        isEditing = true;
    });
}