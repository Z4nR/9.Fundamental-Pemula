const LIST_BOOK_ID = "unread-book";

function addBook() {

    const listBook = document.getElementById(LIST_BOOK_ID);

    const date = new Date().getTime();
    const bookId = `BOOK-${date}`;
    const bookName = document.getElementById("book-name").value;
    const bookAuthor = document.getElementById("book-author").value;
    const bookYear = document.getElementById("book-year").value;

    const book = makeListBook(bookId, bookName, bookAuthor, bookYear);
    listBook.append(book);

}

function makeListBook(id, title, author, year, isCompleted) {
    
    const bookId = document.createElement("h6");
    bookId.innerText = id;

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(bookId, bookTitle, bookAuthor, bookYear);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if (isCompleted) {
        container.append(

        );
    } else {
        container.append(

        );
    }

    return container;

}