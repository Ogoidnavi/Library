const addButton = document.querySelector(".add-book");
const displayInfo = document.getElementById("book-modal");
const cancel = document.querySelector("button[type = reset]");
const deleteAll = document.getElementById("delete-modal");
// let myLibrary = [];

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

cancel.addEventListener("click", () => {
  if (!displayInfo.classList.contains("display-none")) {
    displayInfo.classList.add("display-none");
  }
  if (!deleteAll.classList.contains("display-none")) {
    deleteAll.classList.add("display none");
  }
});
/* TODO
Add function to make delete-modal appear
Add blank modal to html, then add all the data that the user inputs through javascript
*/
