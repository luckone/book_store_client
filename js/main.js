const openMenuBtn = document.getElementById('menu')
const closeMenuBtn = document.getElementById('menu-close')
const sideBar = document.getElementById('sidebar')
const modalTrigger = document.getElementById('addBook')
const modal = document.getElementById('modal')
const createBtn = document.getElementById('createBtn')
const upload = document.getElementById('upload')
const tagsField = document.getElementById('tags')
const tagsContainer = document.getElementById('tags-container')
const container = document.getElementById('page-container')
let image = ''
let tags = []

upload.onchange = (ev) => {
    const i = document.getElementById('placeholder')
    i.style.backgroundImage = `url(${URL.createObjectURL(ev.target.files[0])})`
    image = ev.target.files[0]
}

createBtn.onclick = (ev) => {
    if (!getValue('name') || !getValue('author') || !getValue('price')) {
        alert('Missed required params')
    } else {
        const formData = new FormData();
        formData.append('preview', image)
        formData.append('name', getValue('name'))
        formData.append('author', getValue('author'))
        formData.append('genre', tags.length !== 0 ? JSON.stringify(tags) : JSON.stringify(['Adventures']))
        formData.append('created_at', getValue('date'))
        formData.append('published', getValue('published'))
        formData.append('price', getValue('price'))
        const request = new XMLHttpRequest();
        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                modal.style.display = "none";
                const result = JSON.parse(request.response)
                renderCard(result.book)
            } else {
                alert('Error')
            }
        };
        request.open("POST", "http://199.247.23.102:3000/books/create");
        request.send(formData);
    }
}
openMenuBtn.onclick = (ev) => {
    sideBar.style.transform = 'translateX(0)'
    sideBar.style.opacity = '1'
}
closeMenuBtn.onclick = (ev) => {
    sideBar.style.transform = 'translateX(-150%)'
    sideBar.style.opacity = '0'
}
modalTrigger.onclick = (ev) => {
    sideBar.style.transform = 'translateX(-150%)'
    sideBar.style.opacity = '0'
    modal.style.display = "block"
}

tagsField.onkeyup = (ev) => {
    if (ev.keyCode === 13 || ev.keyCode === 9 || ev.keyCode === 32) {
        renderTag(ev.srcElement.value.trim(), false)
        tags.push(ev.srcElement.value.trim())
        console.log(tags)
        ev.srcElement.value = ''
    } else if (ev.keyCode === 8 && ev.srcElement.value.length < 1) {
        tags.splice(-1, 1)
        renderTag(null, true)
    }
}

window.onclick = (ev) => {
    if (ev.target == modal) {
        modal.style.display = "none";
    }
}

window.onload = (ev) => {
    get('http://199.247.23.102:3000/books/list').then(data => {
        for (let i = 0; i < data.books.length; i++) {
            let book = data.books[i]
            renderCard(book)
        }
    })
}