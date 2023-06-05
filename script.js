const addButton = document.querySelector(".add-book");
const deleteButt = document.getElementById("delete-books");
const cancel = document.querySelectorAll("button[type = reset]");
const displayInfo = document.getElementById("book-info-modal");
const deleteAll = document.getElementById("delete-modal");
const yesButt = document.getElementById("yes");
const bookForm = document.getElementById("bookForm");

let myLibrary = [];
let bookId = 0;

class Book {
  constructor(name = "Unknown", author = "Unknown", pages = 0, read = false) {
    this.id = ++bookId;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

Book.prototype.clickDiv = function () {
  const bookRead = document.getElementById("clickable");
  if (bookRead.innerHTML === "Book Read") {
    bookRead.innerHTML = "Not Read";
  } else {
    bookRead.innerHTML = "Book Read";
  }
};

function createBookModal(book) {
  const modal = document.createElement("div");
  modal.setAttribute("class", "book-modal");
  modal.setAttribute("id", "book-modal");

  modal.dataset.id = book.id;

  /* creation of the modal container div */
  const modalContainer = document.createElement("div");
  modalContainer.setAttribute("class", "modal-container");
  modal.appendChild(modalContainer);

  /* creation of the modal content div */
  const modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modal-content");
  modalContainer.appendChild(modalContent);

  /* creation of the informative div's */

  /* Book name div */
  const firstDiv = document.createElement("div");
  firstDiv.setAttribute("class", "bookName");
  modalContent.appendChild(firstDiv);

  /* Book author div */
  const secondDiv = document.createElement("div");
  secondDiv.setAttribute("class", "bookAuthor");
  modalContent.appendChild(secondDiv);

  /* Page number div */
  const thirdDiv = document.createElement("div");
  thirdDiv.setAttribute("class", "bookPages");
  modalContent.appendChild(thirdDiv);

  /* Book read/not read div */
  const fourthDiv = document.createElement("div");
  fourthDiv.setAttribute("class", "bookRead");
  modalContent.appendChild(fourthDiv);

  const clickable = document.createElement("div");
  clickable.setAttribute("class", "clickRead");
  clickable.setAttribute("id", "clickable");
  fourthDiv.appendChild(clickable);

  /* Buttons div */
  const buttons = document.createElement("div");
  buttons.setAttribute("class", "buttons");
  modalContainer.appendChild(buttons);

  /* Remove Button */
  const firstButton = document.createElement("button");
  firstButton.setAttribute("class", "options");
  firstButton.setAttribute("type", "reset");
  firstButton.textContent = "Remove";
  buttons.appendChild(firstButton);

  /* Edit button */
  const secondButton = document.createElement("button");
  secondButton.setAttribute("class", "options");
  secondButton.setAttribute("type", "submit");
  secondButton.textContent = "Edit";
  buttons.appendChild(secondButton);

  /* Insert modal before the add-book button */
  const bookDisplay = document.querySelector(".book-display");
  bookDisplay.insertBefore(modal, addButton);
}

function displayLibrary() {
  myLibrary.forEach((element) => {
    createBookModal(element);
  });
}

addButton.addEventListener("click", () => {
  displayInfo.classList.remove("display-none");
});

deleteButt.addEventListener("click", () => {
  deleteAll.classList.remove("display-none");
});

/* If more cancel-like buttons are created, using a switch case should be considered */
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
  bookId = 0;
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

/* TODO
Continue the creation of the bookModal
Add all the data that the user inputs to modal
*/
