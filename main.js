let library = [];
const elements = {
  libraryContainer: document.querySelector('.card-container'),
  addBookButton: document.getElementById('add-book-btn'),
  bookForm: document.forms['bookForm'],
  submitButton: document.querySelector('button#submit-btn')
};

function Book(title, author, year, pages, isRead=false) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.isRead = isRead;
}

// Dummy books
library.push(
  new Book("Ducks: And How To Make Them Pay", 'William Cook', 1894, 188, true),
  new Book("How to Teach Quantum Physics to your Dog", 'Chad Orzel', 2010, 256, true),
  new Book("Raccoons Are The Brightest People", 'Sterling North', 1966, 192, false));

// Helper functions
function displayBooks() {
  for (let book of library) {
    let card = createBookCard(book);
    card.setAttribute('data-index', library.indexOf(book));
    elements.libraryContainer.appendChild(card);
  }
}

function createBookCard(book) {
  const card = document.createElement('div');
  let element = null;

  for (const property in book) {
    if (property == 'isRead') {
      element = document.createElement('button');
      if (book.isRead) element.classList.add('read');
      element.textContent = book.isRead ? 'Read' : 'Unread';
      element.addEventListener('click', updateReadStatus); 
    } else {
      element = document.createElement('p');
      element.textContent = book[property];
    }
    card.appendChild(element);
  }

  let deleteBookButton = document.createElement('button');
  deleteBookButton.textContent = 'x';
  deleteBookButton.addEventListener('click', removeBookFromLibrary);
  card.appendChild(deleteBookButton);

  return card;
}

function getBookCardReference(button) {
  const bookCard = button.parentElement;
  const index = Number(bookCard.getAttribute('data-index'));

  return [bookCard, index];
}

function validateForm(form) {
  for (const input of form.getElementsByTagName('input')) {
    if (!input.checkValidity()) return false;
  }

  return true
}

// Event listeners
function displayBookForm(event) {
  elements.bookForm.removeAttribute('hidden');
}

function removeBookFromLibrary(event) {
  const [bookCard, index] = getBookCardReference(event.target);
  library.splice(index, 1);
  elements.libraryContainer.removeChild(bookCard);
}

function updateReadStatus(event) {
  const [bookCard, index] = getBookCardReference(event.target);
  const book = library[index];
  book.isRead = !book.isRead;

  event.target.textContent = book.isRead ? 'Read' : 'Unread';
  event.target.classList.toggle('read');
}

function addBookToLibrary(event) {
  if (validateForm(elements.bookForm)) {
    const book = new Book(
      title=elements.bookForm['title'].value,
      author=elements.bookForm['author'].value,
      year=Number(elements.bookForm['year'].value),
      pages=Number(elements.bookForm['pages'].value),
      read=elements.bookForm['read'].checked
    )
  
    library.push(book);
    const card = createBookCard(book);
    card.setAttribute('data-index', library.indexOf(book));
    elements.libraryContainer.appendChild(card);
    
    elements.bookForm.setAttribute('hidden', 'true');
    elements.bookForm.reset();
  } 
}

displayBooks();
elements.addBookButton.addEventListener('click', displayBookForm);
elements.submitButton.addEventListener('click', addBookToLibrary);
