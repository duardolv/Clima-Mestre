const key = "2588184b6c126e330e62a97afed8e8f9"

const button = document.querySelector(".button").addEventListener('click' ,getCity)

function getCity(){
    const city = document.querySelector(".input-city").value
    searchData(city)
}

async function searchData(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`);
    const data = await response.json();
    
    if(data.cod === "404") {
        document.querySelector('.tittle-temp').innerHTML = 'Não foi encontrado essa cidade';
        // Limpe os outros campos ou defina-os como 'N/A' ou algo similar
    } else {
        uptades(data);
    }
    console.log(data);
}


function uptades (data){
    document.querySelector('.tittle-temp').innerHTML = 'Tempo em '+ data.name + ":"
    document.querySelector('.degress').innerHTML = Math.round(data.main.temp)+"°C"
    document.querySelector('.temp-situaton').innerHTML =data.weather[0].description
    document.querySelector('.icon-description').src= `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    document.querySelector('.humidity').innerHTML="Umidade: " + data.main.humidity+ "%"
    document.querySelector('.max-degress').innerHTML="Max: " + Math.round(data.main.temp_max) +"°C"
    document.querySelector('.min-degress').innerHTML="Min: " + Math.round(data.main.temp_min) +"°C"
}


window.onload = function() {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
      .then(response => response.json())
      .then(municipios => {
        var cidades = municipios.map(function(municipio) {
          return municipio.nome;
        });
  
        var input = document.getElementById('city-input');
  
        input.addEventListener('input', function() {
          var lista = document.getElementById('lista');
          lista.innerHTML = '';
          var valorAtual = this.value.toLowerCase();
  
          if (valorAtual !== '') {
            cidades.forEach(function(cidade) {
              if (cidade.toLowerCase().startsWith(valorAtual)) {
                var opcao = document.createElement('option');
                opcao.value = cidade;
                lista.appendChild(opcao);
              }
            });
          }
        });
      });
  };
