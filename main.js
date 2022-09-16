(function () {
  let library = [];

  // Dummy books
  library.push(
    new Book("Ducks: And How To Make Them Pay", 'William Cook', 1894, 188, true),
    new Book("How to Teach Quantum Physics to your Dog", 'Chad Orzel', 2010, 256, true),
    new Book("Raccoons Are The Brightest People", 'Sterling North', 1966, 192, false));

  const UI = {
    libraryContainer: document.querySelector('.card-container'),
    addBookButton: document.getElementById('add-book-btn'),
    bookForm: document.forms['bookForm'],
    submitButton: document.querySelector('button#submit-btn'),
    closeFormButton: document.getElementById('close-form-btn')
  };

  class Book {
    constructor(title, author, year, pages, isRead=false) {
      this.title = title;
      this.author = author;
      this.year = year;
      this.pages = pages;
      this.isRead = isRead;
    }
    
  }

  // Helper functions
  function displayBooks() {
    for (let book of library) {
      let card = createBookCard(book);
      card.setAttribute('data-index', library.indexOf(book));
      UI.libraryContainer.appendChild(card);
    }
  }

  function createBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('book-card');
    let element = null;

    propertyLoop:
    for (const property in book) {
      element = document.createElement('p');
      switch(property) {
        case 'isRead':
          element = document.createElement('button');
          if (book.isRead) element.classList.add('read');
          element.textContent = book.isRead ? 'Read' : 'Unread';
          element.addEventListener('click', updateReadStatus);
          break;
        case 'author':
          element.textContent = `by ${book[property]}${(book['year']) ? ', ' + book['year'] : ''}`; break;
        case 'year':
          continue propertyLoop;
        case 'pages':
          if (book['property']) {
            element.textContent = (book[property] === 1) ? `${book[property]} page` : `${book[property]} pages`;
          }          
          break;
        default:
          element.textContent = book[property]; break;
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

  function updateRequiredAttr(form) {
    for (const input of form.getElementsByTagName('input')) {
      if (input.id != 'read') {
        (input.getAttribute('required')) ? input.removeAttribute('required') : input.setAttribute('required', 'true');
      };
    }
  }

  function hideForm(form) {
    form.reset();
    updateRequiredAttr(form);
    form.style.display = 'none';
    document.querySelector('.bottom-layer').style.filter = 'brightness(100%)';
  }

  // Event listener callbacks
  function displayBookForm(event) {
    updateRequiredAttr(UI.bookForm);

    UI.bookForm.style.display = 'grid';
    document.querySelector('.bottom-layer').style.filter = 'brightness(50%)';
  }

  function hideBookForm(event) {
    hideForm(UI.bookForm);
  }

  function removeBookFromLibrary(event) {
    const [bookCard, index] = getBookCardReference(event.target);
    library.splice(index, 1);
    UI.libraryContainer.removeChild(bookCard);

    // Update data-index
    const remainingCards = Array.from(UI.libraryContainer.querySelectorAll('.book-card'));
    for (let i = 0; i < remainingCards.length; i++) {
      remainingCards[i].setAttribute('data-index', i)
    }
  }

  function updateReadStatus(event) {
    const [bookCard, index] = getBookCardReference(event.target);
    const book = library[index];
    book.isRead = !book.isRead;

    event.target.textContent = book.isRead ? 'Read' : 'Unread';
    event.target.classList.toggle('read');
  }

  function addBookToLibrary(event) {
    if (validateForm(UI.bookForm)) {
      const book = new Book(
        title=UI.bookForm['title'].value,
        author=UI.bookForm['author'].value,
        year=Number(UI.bookForm['year'].value),
        pages=Number(UI.bookForm['pages'].value),
        read=UI.bookForm['read'].checked
      )
    
      library.push(book);
      const card = createBookCard(book);
      card.setAttribute('data-index', library.indexOf(book));
      UI.libraryContainer.appendChild(card);

      hideForm(UI.bookForm);
    } 
  }

  displayBooks();

  // Event listeners
  UI.addBookButton.addEventListener('click', displayBookForm);
  UI.submitButton.addEventListener('click', addBookToLibrary);
  UI.closeFormButton.addEventListener('click', hideBookForm);

})();
