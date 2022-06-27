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

  let object = {
    id : books.length + 1,
    title : title,
    author : author
  }
  books.push(object);
  alert(title)
  displayBooks(books);
}


