const addButton = document.querySelector(".add-book");
const deleteButt = document.getElementById("delete-books");
const cancel = document.querySelectorAll("button[type = reset]");
const displayInfo = document.getElementById("book-info-modal");
const deleteAll = document.getElementById("delete-modal");
const yesButt = document.getElementById("yes");
const submitButt = document.getElementById("submitButt");
const bookForm = document.getElementById("bookForm");

let myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

/* constructor manipulation practice (may remove if not necessary)
Book.prototype.info = function () {
  if (this.read === true) {
    return `${this.name} by ${this.author}, ${this.pages} pages, has been read`;
  }
  return `${this.name} by ${this.author}, ${this.pages} pages, not read yet`;
}; */

addButton.addEventListener("click", () => {
  displayInfo.classList.remove("display-none");
});

deleteButt.addEventListener("click", () => {
  deleteAll.classList.remove("display-none");
});

/* If more cancel-like buttons are created, using a case switch should be considered */
cancel.forEach((occurrence) => {
  occurrence.addEventListener("click", () => {
    if (!displayInfo.classList.contains("display-none")) {
      displayInfo.classList.add("display-none");
    }
    if (!deleteAll.classList.contains("display-none")) {
      deleteAll.classList.add("display-none");
    }
  });
});

yesButt.addEventListener("click", () => {
  myLibrary = [];
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookName = document.getElementById("name");
  const author = document.getElementById("author");
  const numberPages = document.getElementById("pages");
  const beenRead = document.getElementById("check");

  const myBook = new Book(
    bookName.value,
    author.value,
    numberPages.value,
    beenRead.checked
  );

  myLibrary.push(myBook);
  displayLibrary();
});

function displayLibrary() {}

/* TODO
Add blank modal to html, then add all the data that the user inputs through javascript
*/
