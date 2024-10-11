const addButton = document.querySelector('.add-book');
const deleteButton = document.getElementById('delete-books');
const cancel = document.querySelectorAll('button[type = reset]');
const displayInfo = document.getElementById('book-info-modal');
const deleteAll = document.getElementById('delete-modal');
const yesButton = document.getElementById('yes');
const bookForm = document.getElementById('bookForm');
const numberBooks = document.getElementById('books');
const numberRead = document.getElementById('read-books');
const submitButton = document.getElementById('submitButt');

let myLibrary = [];
let bookId = 0;
let editingBook = null;

class Book {
	constructor(name = 'Unknown', author = 'Unknown', pages = 0, read = false) {
		this.id = ++bookId;
		this.name = name;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
}

Book.prototype.toggleReadStatus = function () {
	this.read = !this.read;
};

function createBookModal(book) {
	const modal = document.createElement('div');
	modal.setAttribute('class', 'book-modal');
	modal.dataset.id = book.id;

	const modalContainer = document.createElement('div');
	modalContainer.setAttribute('class', 'modal-container');
	modal.appendChild(modalContainer);

	const bookTitle = document.createElement('div');
	const titleElement = document.createElement('h2');
	bookTitle.setAttribute('class', 'modal-title');
	titleElement.textContent = `${book.name}`;
	bookTitle.appendChild(titleElement);
	modalContainer.appendChild(bookTitle);

	const modalContent = document.createElement('div');
	modalContent.setAttribute('class', 'modal-content');
	modalContainer.appendChild(modalContent);

	const bookAuthor = document.createElement('div');
	bookAuthor.setAttribute('class', 'bookAuthor');
	bookAuthor.textContent = `Author: ${book.author}`;
	modalContent.appendChild(bookAuthor);

	const bookPages = document.createElement('div');
	bookPages.setAttribute('class', 'bookPages');
	bookPages.textContent = `Pages: ${book.pages}`;
	modalContent.appendChild(bookPages);

	const bookRead = document.createElement('div');
	bookRead.setAttribute('class', 'bookRead');
	bookRead.textContent = `${book.read ? 'Read' : 'Not read'}`;
	modalContent.appendChild(bookRead);

	const buttons = document.createElement('div');
	buttons.setAttribute('class', 'buttons');
	modalContainer.appendChild(buttons);

	const firstButton = document.createElement('button');
	firstButton.setAttribute('class', 'options');
	firstButton.setAttribute('type', 'reset');
	firstButton.textContent = 'Remove';
	firstButton.addEventListener('click', () => {
		// Remove the book from the library array
		const bookIndex = myLibrary.findIndex(b => b.id === book.id);
		if (bookIndex !== -1) {
			myLibrary.splice(bookIndex, 1);
		}
		// Remove the modal from the DOM
		modal.remove();
		// Reorder the grid items
		displayLibrary();
	});
	buttons.appendChild(firstButton);

	const toggleReadButton = document.createElement('button');
	toggleReadButton.setAttribute('class', 'options');
	toggleReadButton.setAttribute('id', 'toggle-read-img');
	toggleReadButton.style.backgroundColor = book.read
		? 'rgb(130, 60, 60)'
		: 'rgb(60, 60, 130)';
	toggleReadButton.addEventListener('click', () => {
		book.toggleReadStatus();
		displayLibrary();
	});

	const toggleReadImg = document.createElement('img');
	toggleReadImg.src = book.read ? './SVG/x.svg' : './SVG/check.svg';
	toggleReadButton.appendChild(toggleReadImg);
	buttons.appendChild(toggleReadButton);

	const secondButton = document.createElement('button');
	secondButton.setAttribute('class', 'options');
	secondButton.setAttribute('type', 'submit');
	secondButton.textContent = 'Edit';
	secondButton.addEventListener('click', () => {
		populateForm(book);
		displayInfo.classList.remove('display-none');
		submitButton.textContent = 'Done';
	});
	buttons.appendChild(secondButton);

	return modal;
}

function populateForm(book) {
	const form = document.getElementById('bookForm');
	form.name.value = book.name;
	form.author.value = book.author;
	form.pages.value = book.pages;
	form.read.checked = book.read;

	editingBook = book; // Store the reference to the book being edited
}

function insertModal(modal) {
	const bookDisplay = document.querySelector('.book-display');
	const addButton = bookDisplay.querySelector('.add-book');
	bookDisplay.insertBefore(modal, addButton);
}

function displayLibrary() {
	const bookDisplay = document.querySelector('.book-display');
	const addButton = bookDisplay.querySelector('.add-book');

	// Remove all book modals but keep the add button
	bookDisplay.innerHTML = '';
	bookDisplay.appendChild(addButton);

	myLibrary.forEach(book => {
		const bookModal = createBookModal(book);
		insertModal(bookModal);
	});

	const totalBooks = myLibrary.length;
	const totalRead = myLibrary.filter(book => book.read).length;
	// Use ternary operators to set the text content
	numberBooks.textContent = totalBooks === 0 ? 'None' : `${totalBooks}`;
	numberRead.textContent = totalRead === 0 ? 'None' : `${totalRead}`;
}

addButton.addEventListener('click', () => {
	displayInfo.classList.remove('display-none');
	submitButton.textContent = 'Add Book';
});

deleteButton.addEventListener('click', () => {
	deleteAll.classList.remove('display-none');
});

/* If more cancel-like buttons are created, using a switch case should be considered */
cancel.forEach(occurrence => {
	occurrence.addEventListener('click', e => {
		if (!displayInfo.classList.contains('display-none')) {
			displayInfo.classList.add('display-none');
		}
		if (!deleteAll.classList.contains('display-none')) {
			deleteAll.classList.add('display-none');
		}
	});
});

yesButton.addEventListener('click', () => {
	myLibrary = [];
	bookId = 0;

	const books = document.querySelectorAll('.book-modal');
	books.forEach(book => {
		book.remove();
	});

	deleteAll.classList.add('display-none');
});

bookForm.addEventListener('submit', e => {
	e.preventDefault();

	// Access the submit button inside the form
	const bookName = document.getElementById('name');
	const author = document.getElementById('author');
	const numberPages = document.getElementById('pages');
	const beenRead = document.getElementById('secondCheck');

	// Check the text inside the button
	if (submitButton.textContent !== 'Done') {
		const myBook = new Book(
			bookName.value,
			author.value,
			numberPages.value,
			beenRead.checked
		);

		myLibrary.push(myBook);
	} else if (editingBook) {
		// Update the existing book information
		editingBook.name = bookName.value;
		editingBook.author = author.value;
		editingBook.pages = numberPages.value;
		editingBook.read = beenRead.checked;
		editingBook = null; // Clear the reference after editing
	}

	displayInfo.classList.add('display-none');
	displayLibrary();

	// Clear the form fields
	bookName.value = '';
	author.value = '';
	numberPages.value = '';
	beenRead.checked = false;
});

function openModal(element) {
	element.classList.remove('display-none');
}
