class Book {
	static bookId = 0;

	constructor(name = 'Unknown', author = 'Unknown', pages = 0, read = false) {
		this.id = ++Book.bookId;
		this.name = name;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	toggleReadStatus() {
		this.read = !this.read;
	}
}

class Library {
	constructor() {
		this.books = [];
		this.editingBook = null;
	}

	addBook(book) {
		this.books.push(book);
	}

	removeBook(bookId) {
		this.books = this.books.filter(book => book.id !== bookId);
	}

	updateBook(updatedBook) {
		const index = this.books.findIndex(book => book.id === updatedBook.id);
		if (index !== -1) {
			this.books[index] = updatedBook;
		}
	}

	clearLibrary() {
		this.books = [];
		Book.bookId = 0;
	}

	get totalBooks() {
		return this.books.length;
	}

	get totalRead() {
		return this.books.filter(book => book.read).length;
	}
}

const library = new Library();

const addButton = document.querySelector('.add-book');
const bookDisplay = document.querySelector('.book-display');
const deleteButton = document.getElementById('delete-books');
const cancelButtons = document.querySelectorAll('button[type=reset]');
const displayInfo = document.getElementById('book-info-modal');
const deleteAll = document.getElementById('delete-modal');
const yesButton = document.getElementById('yes');
const bookForm = document.getElementById('bookForm');
const numberBooks = document.getElementById('books');
const numberRead = document.getElementById('read-books');
const submitButton = document.getElementById('submitButt');

function createBookModal(book) {
	const modal = document.createElement('div');
	modal.className = 'book-modal';
	modal.dataset.id = book.id;

	const modalContainer = document.createElement('div');
	modalContainer.className = 'modal-container';
	modal.appendChild(modalContainer);

	const bookTitle = document.createElement('div');
	bookTitle.className = 'modal-title';
	bookTitle.innerHTML = `<h2>${book.name}</h2>`;
	modalContainer.appendChild(bookTitle);

	const modalContent = document.createElement('div');
	modalContent.className = 'modal-content';
	modalContainer.appendChild(modalContent);

	const bookAuthor = document.createElement('div');
	bookAuthor.className = 'bookAuthor';
	bookAuthor.textContent = `Author: ${book.author}`;
	modalContent.appendChild(bookAuthor);

	const bookPages = document.createElement('div');
	bookPages.className = 'bookPages';
	bookPages.textContent = `Pages: ${book.pages}`;
	modalContent.appendChild(bookPages);

	const bookRead = document.createElement('div');
	bookRead.className = 'bookRead';
	bookRead.textContent = book.read ? 'Read' : 'Not read';
	modalContent.appendChild(bookRead);

	const buttons = document.createElement('div');
	buttons.className = 'buttons';
	modalContainer.appendChild(buttons);

	const removeButton = document.createElement('button');
	removeButton.className = 'options';
	removeButton.type = 'reset';
	removeButton.textContent = 'Remove';
	removeButton.addEventListener('click', () => {
		library.removeBook(book.id);
		modal.remove();
		displayLibrary();
	});
	buttons.appendChild(removeButton);

	const toggleReadButton = document.createElement('button');
	toggleReadButton.className = 'options';
	toggleReadButton.id = 'toggle-read-img';
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

	const editButton = document.createElement('button');
	editButton.className = 'options';
	editButton.type = 'submit';
	editButton.textContent = 'Edit';
	editButton.addEventListener('click', () => {
		populateForm(book);
		submitButton.textContent = 'Done';
		openModal(displayInfo);
	});
	buttons.appendChild(editButton);

	return modal;
}

function populateForm(book) {
	const form = document.getElementById('bookForm');
	form.name.value = book.name;
	form.author.value = book.author;
	form.pages.value = book.pages;
	form.read.checked = book.read;

	library.editingBook = book; // Store the reference to the book being edited
}

function insertModal(modal) {
	bookDisplay.insertBefore(modal, addButton);
}

function displayLibrary() {
	// Remove all book modals but keep the add button
	bookDisplay.innerHTML = '';
	bookDisplay.appendChild(addButton);

	library.books.forEach(book => {
		const bookModal = createBookModal(book);
		insertModal(bookModal);
	});

	numberBooks.textContent =
		library.totalBooks === 0 ? 'None' : `${library.totalBooks}`;
	numberRead.textContent =
		library.totalRead === 0 ? 'None' : `${library.totalRead}`;
}

function addNewBook(name, author, pages, read) {
	const newBook = new Book(name, author, pages, read);
	library.addBook(newBook);
}

function updateExistingBook(name, author, pages, read) {
	const updatedBook = new Book(name, author, pages, read);
	updatedBook.id = library.editingBook.id; // Preserve the original ID
	library.updateBook(updatedBook);
	library.editingBook = null;
}

function resetForm() {
	document.getElementById('name').value = '';
	document.getElementById('author').value = '';
	document.getElementById('pages').value = '';
	document.getElementById('secondCheck').checked = false;
}

function openModal(element) {
	element.classList.remove('display-none');
}

function closeModal(element) {
	element.classList.add('display-none');
}

addButton.addEventListener('click', () => {
	openModal(displayInfo);
	submitButton.textContent = 'Add Book';
});

deleteButton.addEventListener('click', () => {
	openModal(deleteAll);
});

cancelButtons.forEach(button => {
	button.addEventListener('click', () => {
		if (!displayInfo.classList.contains('display-none')) {
			closeModal(displayInfo);
		}
		if (!deleteAll.classList.contains('display-none')) {
			closeModal(deleteAll);
		}
	});
});

yesButton.addEventListener('click', () => {
	library.clearLibrary();

	const books = document.querySelectorAll('.book-modal');
	books.forEach(book => book.remove());

	closeModal(deleteAll);
	displayLibrary();
});

bookForm.addEventListener('submit', event => {
	event.preventDefault();

	const bookName = document.getElementById('name').value;
	const author = document.getElementById('author').value;
	const numberPages = document.getElementById('pages').value;
	const beenRead = document.getElementById('secondCheck').checked;

	if (library.editingBook) {
		updateExistingBook(bookName, author, numberPages, beenRead);
	} else {
		addNewBook(bookName, author, numberPages, beenRead);
	}

	resetForm();
	closeModal(displayInfo);
	displayLibrary();
});
