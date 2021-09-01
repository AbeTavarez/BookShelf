console.log(`RunningES6 script...`)

//* =============== Book Class
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    };
};

//* =============== UI Class
class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete"> X </td>
        `;
        list.appendChild(row);
    };

    showAlert(message, className){
        // create div
        const div = document.createElement('div');
        // add classes
        div.className = `alert ${className}`;
        // add text
        div.appendChild(document.createTextNode(message));
        // get parent
        const container = document.querySelector(`.container`);
        // get form
        const form = document.getElementById(`book-form`);
        // insert alert
        container.insertBefore(div, form);

        // Timeout after 3s
        setTimeout(() => {
            document.querySelector(`.alert`).remove();
        },3000)
    };

    deleteBook(target){
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    };

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    };
};

//* ==================== Local Storage Class
class Store {
    static getBooks(){
        // variable to hold our books
        let books;
        // if there is no books attribute on LS
        if (localStorage.getItem('books') === null){
            books = []; // set books to an empty array
        } else {
            // set books array to the value of books from LS
            books = JSON.parse(localStorage.getItem('books'));
        };
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(book => {
            const ui = new UI;

            //add book to list
            ui.addBookToList(book);
        })
    }

    static addBook(book){
        // use static method to to get our books 
        const books = Store.getBooks();
        console.log(books);
        // push new book to the books array
        books.push(book);
        // set the updated array to local storage
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        // gets all books 
        const books = Store.getBooks();

        // iterate over books 
        books.forEach((book, index) => {
            // check if the isbn is the same as the isbn we passed in
            if (book.isbn === isbn){
                // splice 1 from the index of the book 
                books.splice(index, 1)
            }
        });
        // set the updated array to local storage
        localStorage.setItem('books', JSON.stringify(books));
    }
};



//* ======================================== Events Listeners


// ==================== DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)


// ================= Book Form

document.getElementById('book-form').addEventListener('submit', e => {
    e.preventDefault();
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value; 
    const isbn = document.getElementById('isbn').value;
    
    // Instantiate a book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();
    // validation
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert(`Please fill in all fields`, `error`)
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Add to Local Storage
        Store.addBook(book);

        ui.showAlert(`Book Added!`, ` success`);

        // Clear fields
        ui.clearFields();
    };
});

//* =================== Event Listener for Delete
document.getElementById(`book-list`).addEventListener('click', e => {
    e.preventDefault();
    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show alert
    ui.showAlert('Book removed', 'success')

});

