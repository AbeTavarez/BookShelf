console.log(`RunningES6 script...`)

//* ============ Book Class
class Book {
    constructor(title, author, isbn){
        this.title - title;
        this.author = author;
        this.isbn = isbn;
    }
}

//* ===== UI Class
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
    static getBook(){

    }

    static displayBooks(){

    }

    static addBook(){

    }

    static removeBook(){

    }
}

//* ==================== Events Listeners

document.getElementById('book-form').addEventListener('submit', e => {
    e.preventDefault();
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value; 
    const isbn = document.getElementById('isbn').value;
    console.log(title);
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
    ui.deleteBook(e.target);

    // Show alert
    ui.showAlert('Book removed', 'success')

});

