let myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  if (this.read === true) {
    return `${this.name} by ${this.author}, ${this.pages} pages, has been read`;
  }
  return `${this.name} by ${this.author}, ${this.pages} pages, not read yet`;
};

function addBookToLibrary() {
  // do stuff here
}
