// Daqui para baixo voce ira escrever
// o código para resolver o desafio

// Animações dos números
function animateNumber(element, target, duration) {
  // Função para animar os números
  let startTime = null;

  // Função de passo para a animação
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const current = Math.min(
      Math.floor((progress / duration) * target),
      target
    );
    element.textContent = current;
    if (progress < duration) {
      // Continua a animação
      window.requestAnimationFrame(step);
    } else {
      // Atualiza o elemento com o valor final
      element.textContent = target;
    }
  }

  // Inicia a animação
  window.requestAnimationFrame(step);
}

const POKEMON_COUNT = 1025; // Quantidade de pokemons validos

let id = 1;

// Seleciona os elementos do HTML
const counterElement = document.getElementsByClassName("animation");
const pokemonName = document.getElementById("name");
const pokemonImg = document.getElementById("img_sprite_front_default");
const pokemonBaseExperience = document.getElementById("base-expirence");
const pokemonHeight = document.getElementById("height");
const pokemonWeight = document.getElementById("weight");

// Função para validar a resposta da requisição
const validateResponse = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
};


// Função para buscar os dados do pokemon
const fetchData = (data) => {
  // coleta dos dados
  pokemonName.textContent = data.name;
  pokemonImg.setAttribute("src", data.sprites.front_default);
  pokemonBaseExperience.textContent = data.base_experience;
  pokemonHeight.textContent = data.height;
  pokemonWeight.textContent = data.weight;
  // Animação dos números
  animateNumber(pokemonBaseExperience, data.base_experience, 700);
  animateNumber(pokemonHeight, data.height, 700);
  animateNumber(pokemonWeight, data.weight, 700);
};

// Função para buscar o pokemon
const fetchPokemon = () => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  fetch(url)
    .then(validateResponse)
    .then(fetchData)
    .catch((error) => console.error(error.message));
};

// Inicializa o primeiro pokemon
fetchPokemon();

// Eventos para a atualização dos pokemons
// Evento para o botão de pokemon anterior
function previousPokemon() {
  if (id === 1) {
    id = POKEMON_COUNT;
  } else {
    id--;
  }
  fetchPokemon();
}

// Evento para o botão de pokemon seguinte
function nextPokemon() {
  if (id === POKEMON_COUNT) {
    id = 1;
  } else {
    id++;
  }
  fetchPokemon();
}
