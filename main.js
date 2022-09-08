(function() {
  let library = [];
  const elements = {
    libraryContainer: document.querySelector('.card-container'),
    addBookButton: document.getElementById('add-book-btn'),
    bookForm: document.querySelector('form')
  };

  function Book(title, author, year, pages, isRead=false) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.isRead = isRead;
  }

  library.push(
    new Book("Ducks: And how to Make Them Pay", 'William Cook', 1894, 188, true),
    new Book("How to Teach Quantum Physics to your Dog", 'Chad Orzel', 2010, 256, true),
    new Book("Raccoons Are The Brightest People", 'Sterling North', 1966, 192, false));


  function addBookToLibrary(book) {
    library.push(book);
  }

  function createBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('card');

    for (const property in book) {
      if (property == 'isRead') {
        let readButton = document.createElement('button');
        if (book.isRead) readButton.classList.add('read');
        readButton.textContent = book.isRead ? 'Read' : 'Unread';
        card.appendChild(readButton);
      } else {
        let element = document.createElement('p');
        element.textContent = book[property];
        card.appendChild(element);
      }
    }

    return card;
  }

  function displayBooks() {
    for (let book of library) {
      let card = createBookCard(book);
      elements.libraryContainer.appendChild(card);

      let deleteBookButton = document.createElement('button');
      deleteBookButton.textContent = 'x';
      card.appendChild(deleteBookButton);
    }
  }

  function displayBookForm(event) {
    elements.bookForm.removeAttribute('hidden');
  }

  displayBooks();
  elements.addBookButton.addEventListener('click', displayBookForm);
 })();