//Library array
const myLibrary = [];

//Book constructor
function Book(title, author, totalPages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.read = read;
}
Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
} 

//creates a book and adds it to the library
function addBookToLibrary(title, author, totalPages, pagesRead) {
    let newBook = new Book(title, author, totalPages, pagesRead);
    myLibrary.push(newBook);
    displayBooks();
}

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if(e.target.matches(selector)) callback(e);
    })
}

const removeBookDialog = document.querySelector("#removeBook");
let removeBookId;

document.addEventListener('click', e => {
    const removeBtn = e.target.closest('.remove');
    if(!removeBtn) return;

    removeBookDialog.showModal();
    removeBookId = removeBtn.parentElement.id;
})

addGlobalEventListener('click', '.yes', () => {
    myLibrary.forEach((book, index) => {
        if(book.id === removeBookId) {
            myLibrary.splice(index, 1);
        }
    })
    removeBookDialog.close();
    displayBooks();
})

addGlobalEventListener('click', '.no', () => {
    removeBookDialog.close();
})

addGlobalEventListener('click', '.checkBox', e => {
    const targetBook = e.target.closest('.book');
    myLibrary.forEach(book => {
        if(book.id === targetBook.id) book.toggleReadStatus();
    })
    const readLabel = e.target.parentElement.querySelector('.readLabel');
    if(readLabel.textContent === "Not Read") {
        readLabel.textContent = "Read";
    }else {
        readLabel.textContent = "Not Read";
    }
})

//Open addBook Dialog
const addBookDaialog = document.querySelector('#addBook')
document.addEventListener('click', e => {
    const addBookButton = e.target.closest('.addBook');
    if(!addBookButton) return;
    addBookDaialog.showModal();
})

//Close addBook Dialog
document.addEventListener('click', e => {
    const closeDialogButton = e.target.closest('.close');
    if(!closeDialogButton) return;
    addBookDaialog.close();
})

//Submit the addBook form
const form = document.querySelector('form');
addGlobalEventListener('submit', 'form', e => {
    const bookTitle = document.querySelector('#bookTitle').value;
    const bookAuthor = document.querySelector('#bookAuthor').value;
    const pageCount = document.querySelector('#pageCount').value;
    const alreadyRead = document.querySelector('#alreadyRead').checked;
    addBookToLibrary(bookTitle, bookAuthor, pageCount, alreadyRead);
    addBookDaialog.close();
    form.reset();
    displayBooks();
    e.preventDefault();
})

//displays the book on the page
function displayBooks() {
    const main = document.querySelector('.main');
    main.innerHTML = ``;
    myLibrary.forEach((book) => {
        const card = document.createElement('div');
        card.id = `${book.id}`;
        card.className = 'book';
        const inputId = `read-${book.id}`;
        if(book.read) {
            card.innerHTML = `
            <button class="remove"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-circle-outline</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" /></svg></button>
            <h3>${book.title}</h3>
            <h5>by ${book.author}</h5>
            <div class="totalPages">Total Pages : ${book.totalPages}</div>
            <div class="readStatus">
                <span class="readLabel">Read</span>
                <input type="checkbox" id="${inputId}" class="checkBox" checked>
                <label for="${inputId}" class="button"></label>
            </div>`;
        }else {
            card.innerHTML = `
            <button class="remove"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-circle-outline</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" /></svg></button>
            <h3>${book.title}</h3>
            <h5>by ${book.author}</h5>
            <div class="totalPages">Total Pages : ${book.totalPages}</div>
            <div class="readStatus">
                <span class="readLabel">Not Read</span>
                <input type="checkbox" id="${inputId}" class="checkBox">
                <label for="${inputId}" class="button"></label>
            </div>`;
        }
        main.append(card);
    })
    
}

