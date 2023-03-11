const  container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');



window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e){
    e.preventDefault();
    //console.log('Buscando el Clima...');
    const ciudad =document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad ==='' || pais ==='') {
        //Hubo un error

        mostrarError('Ambos campos obligatorios');
        return;
        
    }
    //Consultariamos la API 
    consultarApi(ciudad,pais);

    // console.log(ciudad);
    // console.log(pais);
}



function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
       //crear una alerta
    const alerta = document.createElement('div');

    alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4',
        'py-3','rounded','max-w-md','mx-auto','mt-6','text-center');
        
        alerta.innerHTML =`
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `;
        container.appendChild(alerta);

        //se elimine la alerta después de  varios segundos
        setTimeout(()=>{
            alerta.remove();
        },6000)
       
    }
}


function consultarApi(ciudad,pais){
    
    const appId ='c8c829010817140bd9857f3e68103d8b';

const url =`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
//const url =`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&units=metric&appid=${appId}`; 
        //console.log(url);

Spinners();//Muestra un spiner de carga 
limpiarHTML();

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos =>{

                console.log(datos);
                //limpiamo  el html se encuentre o no la ciudad por cualquier error 
                limpiarHTML();

                if (datos.cod === "404") {
                    mostrarError('La ciudad tecleada no existe');
                    return;
                    
                }
                //imprime la respuesta en el HTML
                mostrarClima(datos);
            })
}



function mostrarClima(datos) {
    const {
      name,main: { temp, temp_max, temp_min }
    } = datos;
   
    //const centigrados = temp;
    //const centigrados = Math.round(temp - 273.15);
    //utilizando la funcion  kelvinACentigrados 
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent= `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold','text-4xl');

    const actual = document.createElement("p");
    actual.innerHTML = `Actual:${centigrados} °C`;
    actual.classList.add("font-bold", "text-6xl");

    const tempMaxima= document.createElement('p');
    tempMaxima.innerHTML=`Maxima: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMinima= document.createElement('p');
    tempMinima.innerHTML=`Minima: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');
   
    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempMinima);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
   

    resultado.appendChild(resultadoDiv);
    
  }

//   function kelvinACentigrados(grados){
//     return parseInt(grados -273.15);
//   } //podemos optimizar el codigo okok

//funciones que hacen una solo accion ok 
const kelvinACentigrados = grados => parseInt(grados - 273.15);





  function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
  }

function Spinners(){
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');
   
    divSpinner.innerHTML=`
    
    
  <div class="double-bounce1"></div>
  <div class="double-bounce2"></div>
  <div class="double-bounce2"></div>
  <div class="double-bounce2"></div>
    `;
    resultado.appendChild(divSpinner);

}