// ====== These are the elments that will be altered universally
const form = document.getElementById('form');
const booksContainer = document.querySelector('.added-books-container');

// ====== Book Class : Creates a Book when Instantiated ======
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

// ====== Store Class: Handles all Operations on Local Storage ======
class Store {
    static setBook(books){
        localStorage.setItem('books', JSON.stringify(books));
    }
    static addBook(book) {
        const books = JSON.parse(localStorage.getItem('books'));
        // Check if books exist then add them to Local Storage
        if (!books) {
            const books = [];
            this.setBook(books)
            books.push(book);
            this.setBook(books)
        } else {
            books.push(book);
            this.setBook(books)
        }
    }

    static getBooks() {
        // Retrieve books from Storage
        const books = JSON.parse(localStorage.getItem('books'));
        return books;
    }

    static removeBook(bookTitle,bookAuthor){
        let books = this.getBooks();
        console.log(2);

        books.forEach(b => {
            if (bookTitle === b.title && bookAuthor === b.author) {
                console.table(books)
                books.splice(b, 1);
                this.setBook(books)
            }
        })
    }
}


// ====== UI Class : Updates Specific parts of the User Interface ======
class UI {
    static updateBooks(booksContainer) {
        // Get Books from store and add them to UI
        const books = Store.getBooks();
        booksContainer.innerHTML = '';
        if (books) {
            books.forEach((book) => this.addBook(book));
        }
    }

    static addBook(book) {
        const bookUI = document.createElement('div');
        bookUI.className = 'book';

        bookUI.setAttribute('id', (`${book.title}${book.author}`))
        bookUI.innerHTML = `
                <p class="book-title">"
                    <span id='${book.title}${book.author}title'>${book.title}</span>" by 
                    <span id='${book.title}${book.author}author'>${book.author}</span>
                </p>
                <button class="${book.title}${book.author}btn remove-button" type="button" class="remove-button">
                    <i class="fa-solid fa-xmark"></i>
                </button>
        `;
        booksContainer.append(bookUI);

    }

    static clearInputs() {
        form.elements.title.value = '';
        form.elements.author.value = '';
    }

    static removeBook(bookTitle, bookAuthor) {
        document.getElementById(`${bookTitle}${bookAuthor}`).style.display = 'none';
    }


    static displayError(message) {
        alert(message);
    }

    static validate(book) {
        const books = Store.getBooks();

        if (!books) {
            return true;
        }
        let count = 0;
        books.forEach((b) => {
            if (b.title === book.title && b.author === book.author) {
                count++;
            }
        })
        if (count === 0) {
            return true
        } else {
            UI.displayError("Book title and author already added");
            return false;
        }

    }
}

// ====== Form Function : Listens for Form Submission then executes Functions ======
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = form.elements.title.value;
    const author = form.elements.author.value;
    const book = new Book(title, author);
    // Test String for letters
    const validate = /[a-zA-Z]/g;


    if (validate.test(title) && validate.test(author) && UI.validate(book)) {
        Store.addBook(book);
        UI.addBook(book);
        UI.updateBooks(booksContainer);
        UI.clearInputs();
    }
});
// Display Books When Page is reloaded
UI.updateBooks(document.querySelector('.added-books-container'));

// Remove completely from store and UI
const removeBook = () => {
    let books = Store.getBooks();
    booksContainer.addEventListener('click', (e) => {
        books.forEach((b) => {
            if (e.target.classList.contains(`${b.title}${b.author}btn`)) {
                // from from UI
                UI.removeBook(b.title, b.author)
                // remove from Stroage
                let bookTitle = document.getElementById(`${b.title}${b.author}title`).innerHTML;
                let bookAuthor = document.getElementById(`${b.title}${b.author}author`).innerHTML;
                Store.removeBook(bookTitle,bookAuthor)
            }
        })
    })
}
removeBook();
