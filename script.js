const addButton = document.querySelector(".add-book");
const displayInfo = document.getElementById("book-modal");
// let myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

/* constructor manipulation practice 
Book.prototype.info = function () {
  if (this.read === true) {
    return `${this.name} by ${this.author}, ${this.pages} pages, has been read`;
  }
  return `${this.name} by ${this.author}, ${this.pages} pages, not read yet`;
}; */

addButton.addEventListener("click", () => {
  displayInfo.classList.remove("display-none");
});

/* TODO
Add blank modal to html, then add all the data that the user inputs through javascript
*/
