const library = document.getElementById("booksLibrary");
const modal = document.getElementById("modal");
const addBookButton = document.getElementById("addBookButton");
const close = document.querySelector(".close");
const addBookForm = document.getElementById("addBookForm");

let myLibrary = []
let book;

function Book(id, title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read yet'}`
  }
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(crypto.randomUUID(), title, author, pages, read);
  myLibrary.push(newBook);
}

const demoBook = new Book(1, "Demo Book", "Demo Author", 33, true);

addBookToLibrary("The Odin Project", "Norsemen", 990, true);
addBookToLibrary("The Odin Project, The Sequel", "Norsemen", 790, false);

function renderLibrary() {
  // Clear the library first
  library.innerHTML = '';

  myLibrary.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book-card');
    bookElement.id = book.id;
    bookElement.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? 'Read' : 'Not read yet'}</p>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove-book">Remove</button>
    `;
    library.appendChild(bookElement);
  });
}
renderLibrary()



addBookButton.addEventListener("click", () => {
  modal.style.display = "block";
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});


// Event listeners books, using event delegation
library.addEventListener('click', (e) => {
  if (e.target.classList.contains('toggle-read')) {
    const bookId = e.target.parentElement.id;
    const book = myLibrary.find(book => book.id === bookId);
    book.toggleRead();
    renderLibrary();
  }
  if (e.target.classList.contains('remove-book')) {
    const bookId = e.target.parentElement.id;
    myLibrary = myLibrary.filter(book => book.id !== bookId);
    renderLibrary();
  }
});

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBook();
  modal.style.display = "none";
});

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  addBookToLibrary(title, author, pages, read);
  renderLibrary();
}
