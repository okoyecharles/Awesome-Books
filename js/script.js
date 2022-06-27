class Storage {
    getFromStore = (key) => {
        if (!localStorage.getItem(key)) return [];
        else {
            return JSON.parse(localStorage.getItem(key));
        }
    }
    addToStore = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }
    deleteFromStore = (key, title) => {
        // first get the books from storage
        let books = this.getFromStore(key);
        // remove book base on title
        books.forEach((book, index) => {
            if (book.title === title) {
                books.splice(index, 1)
            }
        })
        // add remaining books to storage
        this.addToStore(key, books)
    }
}

let storage = new Storage()

const books = storage.getFromStore('Books');
// function to loop through the already added books stored and display them
const bookContent = (title, author) => {
    const booksContainer = document.querySelector('.added-books-container');
    const bookContainer = document.createElement('div');
    bookContainer.setAttribute('id', `bookContainer${title}`)
    const bookContent = `
                          <p class="book-title"> The title of the book is ${title} </p>
                          <div class= "book-author"> ${author} </div>
                          <button id = '${title}' type="button" class="remove-button"> Remove </button>
                          <hr>
                      `;
    bookContainer.innerHTML = bookContent;
    booksContainer.appendChild(bookContainer);
}
const displayBooks = (books) => {
    books.forEach(book => {
        bookContent(book.title, book.author)
    })
}
displayBooks(books);

const form = document.getElementById('form');
form.addEventListener('submit', ((event) => {
    event.preventDefault();
    addBooks(books);
})
)

// Fuction to add books to array
const addBooks = (books) => {
    const title = form.elements.title.value
    const author = form.elements.author.value
    let book = {
        title: title,
        author: author
    }
    books.push(book);
    // add book to storage when from onsubmit
    new Storage().addToStore("Books", books);
    // add to user interface when form onsubmit
    bookContent(title, author);
}

const removeButtons = Array.from(document.querySelectorAll('.remove-button'))

removeButtons.forEach(button => {
  button.addEventListener('click', () => {
    storage.deleteFromStore('Books', button.id);
    document.getElementById(`bookContainer${button.id}`).style.display = 'none';
  })
})


