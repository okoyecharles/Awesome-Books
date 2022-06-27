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
}


const books = new Storage().getFromStore('Books');
// function to loop through the already added books stored and display them
const bookContent = (title, author) => {
    const booksContainer = document.querySelector('.added-books-container');
    const bookContainer = document.createElement('div');
    const bookContent = `
                          <p class="book-title"> The title of the book is ${title} </p>
                          <div class= "book-author"> ${author} </div>
                          <button type="button"> Remove </button>
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
        id: books.length + 1,
        title: title,
        author: author
    }
    books.push(book);
    // add book to storage when from onsubmit
    new Storage().addToStore("Books", books);
    // add to user interface when form onsubmit
    bookContent(title, author);
}


