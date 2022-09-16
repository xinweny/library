(function () {
  class Library {
    constructor() {
      this.books = [];
      this.books.push(
        new Book("Ducks: And How To Make Them Pay", 'William Cook', 1894, 188, true),
        new Book("How to Teach Quantum Physics to your Dog", 'Chad Orzel', 2010, 256, true),
        new Book("Raccoons Are The Brightest People", 'Sterling North', 1966, 192, false));
    }

    addBook() {
      if (ui.validateForm(ui.bookForm)) {
        const book = new Book(
          ui.bookForm['title'].value,
          ui.bookForm['author'].value,
          Number(ui.bookForm['year'].value),
          Number(ui.bookForm['pages'].value),
          ui.bookForm['read'].checked
        )
      
        this.books.push(book);
        const card = ui.createBookCard(book);
        card.setAttribute('data-index', this.books.indexOf(book));
        ui.libraryContainer.appendChild(card);
  
        ui.hideForm(ui.bookForm);
      }
    }

    removeBook(event) {
      const [bookCard, index] = ui.getBookCardReference(event.target);
      this.books.splice(index, 1);
      ui.libraryContainer.removeChild(bookCard);
  
      // Update data-index
      const remainingCards = Array.from(ui.libraryContainer.querySelectorAll('.book-card'));
      for (let i = 0; i < remainingCards.length; i++) {
        remainingCards[i].setAttribute('data-index', i)
      }
    }

    updateReadStatus(event) {
      const [bookCard, index] = ui.getBookCardReference(event.target);
      const book = this.books[index];
      book.isRead = !book.isRead;
  
      event.target.textContent = book.isRead ? 'Read' : 'Unread';
      event.target.classList.toggle('read');
    }
  }

  class Book {
    constructor(title, author, year, pages, isRead=false) {
      this.title = title;
      this.author = author;
      this.year = year;
      this.pages = pages;
      this.isRead = isRead;
    }
  }

  // Select relevant UI components
  class UI {
    constructor() {
      this.libraryContainer = document.querySelector('.card-container');
      this.addBookButton = document.getElementById('add-book-btn');
      this.bookForm = document.forms['bookForm'];
      this.submitButton = document.querySelector('button#submit-btn');
      this.closeFormButton = document.getElementById('close-form-btn');
      this.bottomLayer = document.querySelector('.bottom-layer');
    }

    displayBooks() {
      for (let book of library.books) {
        let card = ui.createBookCard(book);
        card.setAttribute('data-index', library.books.indexOf(book));
        ui.libraryContainer.appendChild(card);
      }
    }

    createEventListeners() {
      // Event listeners
      this.addBookButton.addEventListener('click', this.displayBookForm.bind(this));
      this.submitButton.addEventListener('click', library.addBook.bind(library));
      this.closeFormButton.addEventListener('click', this.hideForm.bind(this, this.bookForm));
    }

    createBookCard(book) {
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
            element.addEventListener('click', library.updateReadStatus.bind(library));
            break;
          case 'author':
            element.textContent = `by ${book[property]}${(book['year']) ? ', ' + book['year'] : ''}`; break;
          case 'year':
            continue propertyLoop;
          case 'pages':
            if (book[property]) {
              element.textContent = (book[property] === 1) ? `${book[property]} page` : `${book[property]} pages`;
            }          
            break;
          default:
            element.textContent = book[property];
            break;
        }
  
        card.appendChild(element);
      }
  
      let deleteBookButton = document.createElement('button');
      deleteBookButton.textContent = 'x';
      deleteBookButton.addEventListener('click', library.removeBook.bind(library));
      card.appendChild(deleteBookButton);
  
      return card;
    }

    getBookCardReference(button) {
      const bookCard = button.parentElement;
      const index = Number(bookCard.getAttribute('data-index'));
  
      return [bookCard, index];
    }

    // Form related functions
    displayBookForm() {
      updateRequiredAttr(this.bookForm);
  
      this.bookForm.style.display = 'grid';
      this.bottomLayer.style.filter = 'brightness(50%)';
    }

    validateForm(form) {
      for (const input of form.getElementsByTagName('input')) {
        if (!input.checkValidity()) return false;
      }
  
      return true;
    }

    hideForm(form) {
      form.reset();
      updateRequiredAttr(form);
      form.style.display = 'none';
      this.bottomLayer.style.filter = 'brightness(100%)';
    }

    // Helper functions
    updateRequiredAttr(form) {
      for (const input of form.getElementsByTagName('input')) {
        if (input.id != 'read') {
          (input.getAttribute('required')) ? input.removeAttribute('required') : input.setAttribute('required', 'true');
        };
      }
    }
  };

  // Initialize UI components and library
  const library = new Library();
  const ui = new UI();

  ui.displayBooks();
  ui.createEventListeners();
})();
