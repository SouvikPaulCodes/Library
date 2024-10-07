let library=[]

function Book(name, author, pages) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.toggle = function(status) {
        this.status = status;
    }   
}

function addBook(name, author, pages) {
    library.push(new Book(name, author, pages))
}

const list = document.querySelector('.books');
const newBook = document.querySelector('.new');
const dialog = document.querySelector('dialog');
const submit = document.querySelector('.submit');

newBook.addEventListener('click', function() {
    dialog.showModal();
})

submit.addEventListener('click', function(event) {
    const book = document.querySelector('#title');
    const writer = document.querySelector('#author');
    const page = document.querySelector('#pages');
    const check = document.querySelector('#read');

    if(book.value && writer.value && page.value){
        addBook(book.value, writer.value, page.value);
        if(check.checked){
            library.at(-1).status = `Read`;
        } else {
            library.at(-1).status = `Unread`;
        }
        displayBook(library.at(-1), library);
    }

    book.value = '';
    writer.value = '';
    page.value = '';
    check.checked = false;

    event.preventDefault();
    dialog.close();
})

function displayBook(book, library) {
    const card = document.createElement('div');
    card.setAttribute('id', 'card');
    card.classList.add(`card-${library.length-1}`)
    const title = document.createElement('h2');
    const author = document.createElement('h3');
    const pages = document.createElement('h3');
    const div = document.createElement('div');
    div.classList.add('cardButtons');
    const status = document.createElement('button');
    status.classList.add(`-${library.length}`);
    status.setAttribute('id', 'status');
    const remove = document.createElement('button');
    remove.classList.add(`-${library.length-1}`);
    remove.setAttribute('id', 'remove');

    title.textContent = `Title: ${book.name}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `No. Of Pages: ${book.pages}`;
    status.textContent = `${book.status}`;
    remove.textContent = `Remove Book`;

    colorButton(status);

    list.appendChild(card);
    div.append(status, remove);
    card.append(title, author, pages, div);   
}

function removeBook(parent, book) {
    parent.removeChild(book);
}

list.addEventListener('click', function(event) {
    if(event.target.id === `remove`){
            const toRemove = document.querySelector(`.card${event.target.className}`);
            removeBook(list, toRemove);
            
            let num = -1*Number(event.target.className);
            library.splice(num, 1);
    }

    if(event.target.id === 'status'){
        let pos = -1*Number(event.target.className)-1;
        const but = event.target;
        toggleStatus(but, pos);
        colorButton(but);
    } 
})

function toggleStatus(stat, position) {
    if(stat.textContent === 'Read'){
        library.at(position).status = 'Unread';
    } else if(stat.textContent === 'Unread'){
        library.at(position).status = 'Read';
    }
    stat.textContent = `${library.at(position).status}`;
}

function colorButton(stat){
    if(stat.textContent === 'Read'){
        stat.style.backgroundColor = 'rgb(94, 255, 94)'
    } else if(stat.textContent === 'Unread'){
        stat.style.backgroundColor = 'rgb(255, 92, 92)';
    }
}




