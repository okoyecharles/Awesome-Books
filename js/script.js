// array of objects for books
const books = [
    {
        id: 1,
        title: "The blue bird",
        author: "Charles Okoye",
    },
    {
        id: 2,
        title: "Anase in the land of idiot",
        author: "Desmond Owusu",
    },
]
// function to loop through the already added books stored and display them
const displayBooks = (books) => {
    books.forEach(book => {
        const booksContainer = document.querySelector('.added-books-container');
        const bookContainer = document.createElement('div');
        const bookContent = `
                            <p class="book-title"> The title of the book is ${book.title} </p>
                            <div class= "book-author"> ${book.author} </div>
                            <button type="button"> Remove </button>
                        `;
        bookContainer.innerHTML = bookContent;
        booksContainer.appendChild(bookContainer);
    })
}
displayBooks(books);