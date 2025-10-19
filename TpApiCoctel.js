let apiKey = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'

let areaCocteles = document.getElementById('areaCocteles');
let todosCocteles = [];

// Función para cargar un solo cóctel (el primero)
function cargarUnCoctel() {
    areaCocteles.innerHTML = '<p>Cargando cóctel...espera un momento por favor</p>';
    
    fetch(apiKey)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            // Tomar solo un cóctel
            let UnCoctel = datos.drinks[0];
            mostrarUnCoctel(UnCoctel);
        })
        .catch(function(error) {
            areaCocteles.innerHTML = '<p>Error al cargar el cóctel</p>';
        });
}

// Función para cargar foto aleatoria
function cargarFotoAleatoria() {
    areaCocteles.innerHTML = '<p>Cargando foto aleatoria...en segundos podrá ver un delicioso coctel</p>';
    
    fetch(urlApi)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            // Elegir un cóctel aleatorio
            let numeroAleatorio = Math.floor(Math.random() * datos.drinks.length);
            let coctelAleatorio = datos.drinks[numeroAleatorio];
            mostrarSoloFoto(coctelAleatorio);
        })
        .catch(function(error) {
            areaCocteles.innerHTML = '<p>Error al cargar la foto</p>';
        });
}

// Función para cargar todos los cócteles
function cargarTodosLosCocteles() {
    areaCocteles.innerHTML = '<p>Cargando todos los cócteles...espere por favor</p>';
    
    fetch(urlApi)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            todosCocteles = datos.drinks;
            mostrarTodosLosCocteles();
        })
        .catch(function(error) {
            areaCocteles.innerHTML = '<p>Error al cargar los cócteles</p>';
        });
}

// Función para mostrar un solo cóctel completo
function mostrarUnCoctel(coctel) {
    let ingredientes = obtenerIngredientes(coctel);
    
    areaCocteles.innerHTML = `
        <div class="tarjeta-coctel">
            <div class="nombre-coctel">${coctel.strDrink}</div>
            <img src="${coctel.strDrinkThumb}" alt="${coctel.strDrink}" class="foto-coctel">
            
            <div class="info-basica">
                <div class="titulo-seccion">📋 Información Básica</div>
                <p><strong>Tipo:</strong> ${coctel.strAlcoholic}</p>
                <p><strong>Categoría:</strong> ${coctel.strCategory}</p>
                <p><strong>Vaso:</strong> ${coctel.strGlass}</p>
            </div>
            
            <div class="ingredientes">
                <div class="titulo-seccion">🥃 Ingredientes</div>
                <ul class="lista-ingredientes">
                    ${ingredientes}
                </ul>
            </div>
            
            <div class="instrucciones">
                <div class="titulo-seccion">📝 Instrucciones</div>
                <p>${coctel.strInstructions}</p>
            </div>
        </div>
    `;
}

// Función para mostrar solo una foto
function mostrarSoloFoto(coctel) {
    areaCocteles.innerHTML = `
        <div class="solo-foto">
            <h3>${coctel.strDrink}</h3>
            <img src="${coctel.strDrinkThumb}" alt="${coctel.strDrink}">
        </div>
    `;
}

// Función para mostrar todos los cócteles
function mostrarTodosLosCocteles() {
    let htmlCompleto = '';
    
    for (let i = 0; i < todosCocteles.length; i++) {
        let coctel = todosCocteles[i];
        let ingredientes = obtenerIngredientes(coctel);
        
        htmlCompleto += `
            <div class="tarjeta-coctel">
                <div class="nombre-coctel">${coctel.strDrink}</div>
                <img src="${coctel.strDrinkThumb}" alt="${coctel.strDrink}" class="foto-coctel">
                
                <div class="info-basica">
                    <div class="titulo-seccion">📋 Información Básica</div>
                    <p><strong>Tipo:</strong> ${coctel.strAlcoholic}</p>
                    <p><strong>Categoría:</strong> ${coctel.strCategory}</p>
                    <p><strong>Vaso:</strong> ${coctel.strGlass}</p>
                </div>
                
                <div class="ingredientes">
                    <div class="titulo-seccion">🥃 Ingredientes</div>
                    <ul class="lista-ingredientes">
                        ${ingredientes}
                    </ul>
                </div>
                
                <div class="instrucciones">
                    <div class="titulo-seccion">📝 Instrucciones</div>
                    <p>${coctel.strInstructions}</p>
                </div>
            </div>
        `;
    }
    
    areaCocteles.innerHTML = htmlCompleto;
}

// Función para obtener los ingredientes de un cóctel
function obtenerIngredientes(coctel) {
    let listaIngredientes = '';
    
    for (let i = 1; i <= 15; i++) {
        let ingrediente = coctel['strIngredient' + i];
        let medida = coctel['strMeasure' + i];
        
        if (ingrediente && ingrediente.trim() !== '') {
            if (medida && medida.trim() !== '') {
                listaIngredientes += `<li><span class="medida">${medida}</span> - ${ingrediente}</li>`;
            } else {
                listaIngredientes += `<li>Al gusto - ${ingrediente}</li>`;
            }
        }
    }
    
    return listaIngredientes;
}