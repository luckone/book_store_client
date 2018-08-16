const renderCard = (book) => {
    let tmpl = document.getElementById('card-template').content.cloneNode(true)
    let tagsArr = JSON.parse(book.genre)
    tmpl.querySelector('.card-name').innerText = book.book_name
    tmpl.querySelector('.card-published_name').innerText = book.published ? book.published : 'unnamed'
    tmpl.querySelector('.card-img').src = book.preview ? book.preview : './assets/img/no-image.png'
    tmpl.querySelector('.card-author').innerText = book.author
    tmpl.querySelector('.card-year').innerText = book.created_at ? parseInt(book.created_at) : '2018'
    tmpl.querySelector('.card-purchase').innerText = `${book.price}$`
    for (let i = 0; i < tagsArr.length; i++) {
        const newTag = document.createElement('span')
        newTag.className = 'tag'
        newTag.innerText = tagsArr[i]
        const cardTagContainer = tmpl.querySelector('.tags')
        cardTagContainer.appendChild(newTag)
    }
    tmpl.querySelector('.card').onclick = (ev) => {
        window.location.href = `bookItem.html?${book._id}`
    }
    container.insertBefore(tmpl, container.firstChild);
}

const renderTag = (v, remove) => {
    if(v && !remove) {
        const newTag = document.createElement('span')
        newTag.className = 'tag-embed'
        newTag.innerText = v
        tagsContainer.insertBefore(newTag, tagsField)
    } else {
        tagsContainer.removeChild(tagsContainer.children[tagsContainer.children.length - 2])
    }
}

const renderItem = (data) => {
    let tagsArr = JSON.parse(data.genre)
    document.querySelector('.book_name').innerHTML = data.book_name
    document.querySelector('.book_year').innerHTML = data.created_at ? parseInt(data.created_at) : '2018'
    document.querySelector('.book_publishing').innerHTML = `Publishing house: ${data.published}`
    document.querySelector('.book_price').innerHTML = `Price: ${data.price}$`
    document.querySelector('.book_author').innerHTML = data.author
    document.querySelector('.book-item__img').src = data.preview ? data.preview : './assets/img/no-image.png'
    for (let i = 0; i < tagsArr.length; i++) {
        const newTag = document.createElement('span')
        newTag.className = 'tag'
        newTag.innerText = tagsArr[i]
        const cardTagContainer = document.querySelector('.book_genre')
        cardTagContainer.appendChild(newTag)
    }
}