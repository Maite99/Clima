const btnEnviar = document.getElementById('boton-enviar');
const inputCiudad = document.getElementById('input-ciudad');
const resultadoBox = document.getElementById('resultado');

btnEnviar.addEventListener('click', (event) => {
    // para que no se recargue la pagina
    event.preventDefault();
    
    const ciudad = inputCiudad.value;

    // si no introduce nada el usuario
    if(ciudad === ''){
        alert('Introduce una ciudad por favor');
        return;
    }

    // llamo a la funcion que tiene la llamada a la API
    getWeatherData(ciudad)

    // para que se vacie el input
     inputCiudad.value = '';
})  

// ******    FUNCIÓN QUE LLAMA A LA API Y MUESTRA LOS RESULTADOS ********
function getWeatherData(ciudad){
    // fetch
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`)
    // si no se encuentra la ciudad
    .then(response => {
        if(!response.ok){
            resultadoBox.innerHTML = `
                <p>No se ha encontrado la ciudad</p>
            `
            // se detiene el flujo devlviendo null
            return null;
        }
        return response.json();
    })

    // si se encuentra la ciudad
    .then(data => {
        if(data){
            resultadoBox.innerHTML = `
            <h2> Clima actual de ${ciudad}</h2>
            <ul>
                <li>Temperatura: ${data.main.temp}°C</li>
                <li>Humedad: ${data.main.humidity}%</li>
                <li>Condiciones meteorológicas: ${data.weather[0].description}</li>
            </ul>
            `
        }   
    })

    // si hay algún error
    .catch(error => {
        resultadoBox.innerHTML = `
            <p>Error al obtener los datos</p>
        `
    })
      
}