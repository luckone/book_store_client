const id = window.location.search.replace(/[^\w\s]/gi, '')
const info = document.getElementById('info')
const infoEdit = document.getElementById('info-edit')
const deleteBtn = document.getElementById('delete')
const editBtn = document.getElementById('edit')
const confirmBtn = document.getElementById('confirm')
let book = {}

const toggleEdit = () => {
    if (info.style.display === 'none') {
        infoEdit.style.display = 'none'
        info.style.display = 'block'
        editBtn.innerText = 'edit book'
    } else {
        info.style.display = 'none'
        infoEdit.style.display = 'block'
        editBtn.innerText = 'cancel edit'
    }
}

deleteBtn.onclick = (ev) => {
    remove(`http://199.247.23.102:3000/books/remove/${id}`).then(data => {
        if (data.status) {
            alert('Deleted')
            window.location.href = 'index.html'
        }
    })
}

editBtn.onclick = (ev) => {
    toggleEdit()
}

confirmBtn.onclick = (ev) => {
    let tempBook = book
    tempBook.book_name = getValue('name') ? getValue('name') : book.book_name
    tempBook.author = getValue('author') ? getValue('author') : book.author
    tempBook.created_at = getValue('date') ? getValue('date') : book.created_at
    post(`http://199.247.23.102:3000/books/update/${id}`, tempBook).then(data => {
        if(data.status) {
            toggleEdit()
            renderItem(tempBook)
        } else alert('Editing error')
    }).catch(ex => {
        console.log(ex)
    })
}

get(`http://199.247.23.102:3000/books/get-book/${id}`).then(data => {
    book = data.book
    renderItem(book)
})