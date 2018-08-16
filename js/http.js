const xhr = (type, url, data) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest()
        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                resolve(JSON.parse(request.response));
            } else {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };
        request.open(type.toUpperCase(), url)
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(data))
    })
}

const post = async(url, data) => {
    let result = await xhr('post', url, data)
    return result
}
const get = async (url) => {
    let result = await xhr('get', url)
    return result
}
const remove = async (url) => {
    let result = await xhr('delete', url)
    return result
}


const getValue = (field) => {
    return document.getElementById(field).value
}

