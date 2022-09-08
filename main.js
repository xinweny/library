(function() {
  let library = [];

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

    card.appendChild(document.createElement('h2')
      .appendChild(document.createTextNode(book.title)));
    card.appendChild(document.createElement('p')
      .appendChild(document.createTextNode(book.author)));
    card.appendChild(document.createElement('p')
      .appendChild(document.createTextNode(book.year)));
    card.appendChild(document.createElement('p')
      .appendChild(document.createTextNode(book.pages)));
      card.appendChild(document.createElement('button')
      .appendChild(document.createTextNode(book.isRead)));

    return card;
  }

  function displayBooks() {
    const libraryContainer = document.querySelector('.content');

    for (let book of library) {
      let card = createBookCard(book);
      libraryContainer.appendChild(card);
    }
  }

  displayBooks();
 })();