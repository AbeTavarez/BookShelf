console.log(`Running script...`);

//* ========== Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn
}

//* ===== UI Constructor
function UI() {}

//* =============== UI Prototype Add Book to list
UI.prototype.addBookToList = function(book) {
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
}
//* ============== UI Prototype Show alert
UI.prototype.showAlert = function(message, className) {
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
}

//* ============== UI Prototype Clear Fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};

//* ============== Delete Book
UI.prototype.deleteBook = function (target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
} 

//* ==================== Events Listeners

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

