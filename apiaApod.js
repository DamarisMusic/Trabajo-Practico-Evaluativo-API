let imagenFecha = document.querySelector('#imagenFecha')
let botonFecha = document.querySelector('#botonFecha')
let fechaUsuario =document.querySelector('#fecha')

botonFecha.onclick = function (){
     console.log(fechaUsuario)
     fetch('https://api.nasa.gov/planetary/apod?api_key=${key}&date=${fechaUsuario.value}')
     .then (res => res.json())
     .then(fotoFecha => {
        imagenFecha.src = fotoFecha.hdurl
     }
)}

let contenedorImagen = document.querySelector('.contenedor-imagen')
let botonCantidad = document.querySelector('#botonCantidad')
let cantidadUsuario = document.querySelector('#cantidad')

botonCantidad.onclick = function (){
    console.log(cantidadUsuario.value)
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&count=${cantidadUsuario.value}`)
    .then(res => res.json())
    .then(fotos => {
        contenedorImagen.innerHTML = ''
        for(let i = 0; i < fotos.length; i++){
            contenedorImagen.innerHTML = `${contenedorImagen.innerHTML} <img src='${fotos[i].url}' alt='${fotos[i].title}'>`
        }
    }
 )
}

   

