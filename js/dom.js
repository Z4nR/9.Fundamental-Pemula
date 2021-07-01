const LIST_BOOK_ID = "unread-book";

function addBook() {

    const listBook = document.getElementById(LIST_BOOK_ID);

    const bookName = document.getElementById("book-name").value;
    const bookAuthor = document.getElementById("book-author").value;
    const bookYear = document.getElementById("book-year").value;

    console.log("book name" + bookName);
    console.log("book author" + bookAuthor);
    console.log("book year" + bookYear);

    for (let i = 0; i < 10; i++) {
        const book = makeListBook();
        listBook.append(book);
    }

}

function makeListBook() {
    
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = "Zulham Petualang";

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = "Zulham Ari";

    const bookYear = document.createElement("p");
    bookYear.innerText = "2021";

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(bookTitle, bookAuthor, bookYear);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    return container;

}