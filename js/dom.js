const LIST_BOOK_ID = "unread-book";

function addBook() {

    const listBook = document.getElementById(LIST_BOOK_ID);

    const bookName = document.getElementById("book-name").value;
    const bookAuthor = document.getElementById("book-author").value;
    const bookYear = document.getElementById("book-year").value;

    console.log("book name " + bookName);
    console.log("book author " + bookAuthor);
    console.log("book year " + bookYear);

    const book = makeListBook(bookName, bookAuthor, bookYear);
    listBook.append(book);

}

function makeListBook(title, author, year, isCompleted) {
    
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(bookTitle, bookAuthor, bookYear);

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