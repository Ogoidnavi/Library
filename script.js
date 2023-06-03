const addButton = document.querySelector(".add-book");
const deleteButt = document.getElementById("delete-books");
const cancel = document.querySelectorAll("button[type = reset]");
const displayInfo = document.getElementById("book-info-modal");
const deleteAll = document.getElementById("delete-modal");
const yesButt = document.getElementById("yes");
const bookForm = document.getElementById("bookForm");

let myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  const bookRead = document.getElementById("firstCheck");
  const checkLabel = document.getElementById("firstLabel");
  bookRead.addEventListener("click", () => {
    if (!bookRead.checked) {
      checkLabel.innerHTML = "Not Read";
    }
  });
};

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
  displayLibrary();
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookName = document.getElementById("name");
  const author = document.getElementById("author");
  const numberPages = document.getElementById("pages");
  const beenRead = document.getElementById("secondCheck");

  const myBook = new Book(
    bookName.value,
    author.value,
    numberPages.value,
    beenRead.checked
  );

  myLibrary.push(myBook);
  displayInfo.classList.add("display-none");
  displayLibrary();
});

function createBookModal() {
  const modal = document.createElement("div");
  modal.setAttribute("class", "book-modal");
  modal.setAttribute("id", "book-modal");

  /* creation of the modal container div */
  const modalContainer = document.createElement("div");
  modalContainer.setAttribute("class", "modal-container");
  modal.appendChild(modalContainer);

  /* creation of the modal content div */
  const modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modal-content");
  modalContainer.appendChild(modalContent);

  /* creation of the informational divs */
  const firstDiv = document.createElement("div");
  firstDiv.setAttribute("class", "bookName");
  modalContent.appendChild(firstDiv);

  const secondDiv = document.createElement("div");
  secondDiv.setAttribute("class", "bookAuthor");
  modalContent.appendChild(secondDiv);

  const firstDiv = document.createElement("div");
  firstDiv.setAttribute("class", "bookName");
  modalContent.appendChild(firstDiv);

  const firstDiv = document.createElement("div");
  firstDiv.setAttribute("class", "bookName");
  modalContent.appendChild(firstDiv);

  /* Insert modal before the add-book button */
  const bookDisplay = document.querySelector(".book-display");
  bookDisplay.insertBefore(modal, addButton);
}

function displayLibrary() {}
/* TODO
Continue the creation of the bookModal
Add blank modal to html, then add all the data that the user inputs through javascript
*/
