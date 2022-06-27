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
    // deleteFromStore = (key, value, id) => {
    //     localStorage.setItem(key, JSON.stringify(value))
    // }
}

let storage = new Storage()

const books = storage.getFromStore('Books');
// function to loop through the already added books stored and display them
const bookContent = (id, title, author) => {
    const booksContainer = document.querySelector('.added-books-container');
    const bookContainer = document.createElement('div');
    bookContainer.setAttribute('id', id)
    const bookContent = `
                          <p class="book-title"> The title of the book is ${title} </p>
                          <div class= "book-author"> ${author} </div>
                          <button type="button" class="remove-button"> Remove </button>
                      `;
    bookContainer.innerHTML = bookContent;
    booksContainer.appendChild(bookContainer);
}
const displayBooks = (books) => {
    books.forEach(book => {
        bookContent(book.id, book.title, book.author)
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
    const id =  books.length + 1
    let book = {
        id: id,
        title: title,
        author: author
    }
    books.push(book);
    // add book to storage when from onsubmit
    new Storage().addToStore("Books", books);
    // add to user interface when form onsubmit
    bookContent(id, title, author);
}

const removeButtons = Array.from(document.querySelectorAll('.remove-button'))

removeButtons.forEach(button => {
  button.addEventListener('click', () => {
    removeBook(books, button.parentElement.id)
  })
})


