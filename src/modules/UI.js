class UI {
  constructor() {
    this.libraryContainer = document.querySelector('.card-container');
    this.addBookButton = document.getElementById('add-book-btn');
    this.bookForm = document.forms['bookForm'];
    this.submitButton = document.querySelector('button#submit-btn');
    this.closeFormButton = document.getElementById('close-form-btn');
    this.bottomLayer = document.querySelector('.bottom-layer');
    this.signInButton = document.querySelector('.sign-in-btn');
    this.signOutButton = document.querySelector('.sign-out-btn');
    this.profileDisplay = document.querySelector('.profile-display');
  }

  createBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('book-card');

    const id = book.id;
    card.setAttribute('data-id', id);

    let element;

    propertyLoop:
    for (const property in book) {
      element = document.createElement('p');

      switch(property) {
        case 'isRead':
          element = document.createElement('button');
          element.className = 'read-btn';
          element.setAttribute('data-id', id);
          if (book.isRead) element.classList.add('read');
          element.textContent = book.isRead ? 'Read' : 'Unread';
          break;
        case 'author':
          element.textContent = `by ${book[property]}${(book['year']) ? ', ' + book['year'] : ''}`; break;
        case 'year':
          continue propertyLoop;
        case 'pages':
          if (book[property]) {
            element.textContent = `${book[property]} page${(book[property] === 1) ? '' : 's'}`;
          }          
          break;
        case 'title':
          element.textContent = book[property]; break;
        default: break;
      }

      card.appendChild(element);
    }

    const deleteBookButton = document.createElement('button');
    deleteBookButton.className = 'delete-btn';
    deleteBookButton.textContent = 'x';
    deleteBookButton.setAttribute('data-id', id);
    card.appendChild(deleteBookButton);

    return card;
  }

  displayBooks(library) {
    this.libraryContainer.innerHTML = '';

    for (let book of library.books) {
      let card = this.createBookCard(book);
      this.libraryContainer.appendChild(card);

      this.bindReadButton(library.updateReadStatus.bind(library), book.id, library);
		  this.bindDeleteButton(library.removeBook.bind(library), book.id, library);
    }
  }

  bindAddBookButton() {
    this.addBookButton.addEventListener('click', () => {
      this.updateRequiredAttr(this.bookForm);

      this.bookForm.style.display = 'grid';
      this.bottomLayer.style.filter = 'brightness(50%)';
    });
  }

  bindSubmitButton(handler, library) {
    this.submitButton.addEventListener('click', () => {
      if (this.validateForm(this.bookForm)) {
        const bookObj = {
          title: this.bookForm['title'].value,
          author: this.bookForm['author'].value,
          year: Number(this.bookForm['year'].value),
          pages: Number(this.bookForm['pages'].value),
          isRead: this.bookForm['read'].checked,
        }
  
        const book = handler(bookObj);
  
        const card = this.createBookCard(book);
        this.libraryContainer.appendChild(card);
  
        this.hideForm(this.bookForm);
        this.displayBooks(library);
      }
    });
  }

  bindReadButton(handler, id, library) {
    const button = this.libraryContainer.querySelector(`.read-btn[data-id="${id}"]`);

    button.addEventListener('click', (event) => {
      handler(id);
      this.displayBooks(library);
    });
  }

  bindDeleteButton(handler, id, library) {
    const button = this.libraryContainer.querySelector(`.delete-btn[data-id="${id}"]`);

    button.addEventListener('click', () => {
      handler(id);
      this.displayBooks(library);
    });
  }

  bindCloseFormButton() {
    this.closeFormButton.addEventListener('click', () => {
      this.hideForm(this.bookForm);
    });
  }

  // Form related functions
  validateForm(form) {
    for (const input of form.getElementsByTagName('input')) {
      if (!input.checkValidity()) return false;
    }

    return true;
  }

  hideForm(form) {
    form.reset();
    this.updateRequiredAttr(form);
    form.style.display = 'none';
    this.bottomLayer.style.filter = 'brightness(100%)';
  }

  updateRequiredAttr(form) {
    for (const input of form.getElementsByTagName('input')) {
      if (input.id != 'read') {
        (input.getAttribute('required')) ? input.removeAttribute('required') : input.setAttribute('required', 'true');
      };
    }
  }

  // Authentication related functions
  showSignIn(imgUrl, userName) {
    const displayName = document.createElement('p');
    displayName.textContent = userName;

    const displayPic = document.createElement('img');
    displayPic.setAttribute('referrerpolicy', 'no-referrer');
    displayPic.src = imgUrl;
    
    this.profileDisplay.appendChild(displayName);
    this.profileDisplay.appendChild(displayPic);

    this.signOutButton.removeAttribute('hidden');
    this.signInButton.setAttribute('hidden', 'true');
  }

  showSignOut() {
    this.profileDisplay.innerHTML = '';

    this.signInButton.removeAttribute('hidden');
    this.signOutButton.setAttribute('hidden', 'true');
  }

  bindSignInButton(handler) {
    this.signInButton.addEventListener('click', handler);
  }

  bindSignOutButton(handler) {
    this.signOutButton.addEventListener('click', handler);
  }
}

export default UI;