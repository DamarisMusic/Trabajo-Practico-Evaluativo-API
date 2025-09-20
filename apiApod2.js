let contenedorImagen = document.querySelector('.contenedor-imagen')
let botonAleatorio = document.querySelector('#botonAleatorio')

botonAleatorio.onclick = function () {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`)
        .then(res => res.json())
        .then(foto => {
            contenedorImagen.innerHTML = ''  
            contenedorImagen.innerHTML = `<img src='${foto.url}' alt='${foto.title}' style='width:100%; max-width:500px; margin:10px auto; display:block; border-radius:8px;'>`
        })

}       