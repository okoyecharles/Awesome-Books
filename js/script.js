const form = document.getElementById('form');
const booksContainer = document.querySelector('.added-books-container')

// This function deletes the book from the UI and the Local Storage
const deleteBook = (btn) => {
    const parent = btn.parentElement;
    parent.parentElement.removeChild(parent);
    let books = JSON.parse(localStorage.getItem('books'));
    books = books.filter(book => book.title != btn.parentElement.children[0].innerHTML.slice(8));
    localStorage.setItem('books', JSON.stringify(books));
}

// This Updates The User Interface When 'add' is clicked
const updateUI = () => {
  const books = JSON.parse(localStorage.getItem('books'));
  booksContainer.innerHTML = ``;
  if (books) {
    books.forEach(book => {
      if (book.title && book.author) {
        const bookUI = document.createElement('div')
        bookUI.className = 'book'
        bookUI.innerHTML = `
        <p class="book-title"> Title: ${book.title}</p>
        <div class= "book-author"> By ${book.author} </div>
        <button id = '${book.title}' type="button" class="remove-button"> Remove </button>
        <hr>`
        booksContainer.appendChild(bookUI)
      }
    })
  }
  const removeBtns = Array.from(document.querySelectorAll('.remove-button'))

  removeBtns.forEach(btn => btn.addEventListener('click', () => deleteBook(btn)) )
}

updateUI()

// This Function Adds Book information to Local Storage
const addToStore = (bookObj, title, author) => {
  if (title && author) {
    if (!localStorage.getItem('books')) {
      localStorage.setItem('books', JSON.stringify([]))
      const books = JSON.parse(localStorage.getItem('books'))
      books.push(bookObj);
      localStorage.setItem('books', JSON.stringify(books))
    } else {
      const books = JSON.parse(localStorage.getItem('books'))
      books.push(bookObj);
      localStorage.setItem('books', JSON.stringify(books))
    }
  }
}

// This Executes Certain Functions When the form is submitted
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const bookObj = {
    title: title,
    author: author
  }
  form.elements.title.value = ''
  form.elements.author.value = ''
  
  // Update the Storage and User Interface
  addToStore(bookObj, title, author)
  updateUI()
})
