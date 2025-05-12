const myLibrary = []
const library = document.getElementById("booksLibrary");
let book;

console.log(library)

function Book(id, title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read yet'}`
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(crypto.randomUUID(), title, author, pages, read);
  myLibrary.push(newBook);
}

const demoBook = new Book(1,"Demo Book","Demo Author",33,true);
console.log(demoBook)
console.log(demoBook.info())

addBookToLibrary("The Odin Project", "Norsemen", 990, true);
addBookToLibrary("The Odin Project, The Sequel", "Norsemen", 790, false);
console.log(myLibrary)

function renderLibrary() {
  // Clear the library first
  library.innerHTML = '';
  
  myLibrary.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book-card');
    bookElement.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? 'Read' : 'Not read yet'}</p>
    `;
    library.appendChild(bookElement);
  });
}
renderLibrary()
