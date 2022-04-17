import {fetchPokemon, takePokemon,takePokemonByType,removeChildNodes} from './data.js';

const pokemonContainer = document.querySelector('.container-pokemon');
const previousBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');
const searchPokemon = document.getElementById('search-pokemon');
const buttonSearchPokemon= document.getElementById('button-search-pokemon');
const searchPokemonTypes = document.getElementById('search-pokemon-types');
const buttonSearchPokemonTypes = document.getElementById('button-search-pokemon-types');
const toggleMenuElement = document.getElementById('toggle-menu');
const mainMenuElement = document.getElementById('main-menu');

let url = 'https://pokeapi.co/api/v2/pokemon';
let offset = 1;
let limit = 8;



previousBtn.addEventListener('click', () => {
	if(offset != 1) {
		offset -=9;
		removeChildNodes(pokemonContainer);
		fetchPokemons(offset,limit);
	}
	
});

nextBtn.addEventListener('click', () => {
	removeChildNodes(pokemonContainer);
	offset += 9;	
	fetchPokemons(offset,limit);
});



const fetchPokemons = (offset, limit) =>{
	for(let i=offset; i<= offset + limit; i ++){
		fetchPokemon(url, i, pokemonContainer);
	}
};

fetchPokemons(offset,limit); 

buttonSearchPokemon.addEventListener('click', (e) => {
	e.preventDefault();
	let searchString = searchPokemon.value.toLowerCase();
	previousBtn.style.display='none';
	nextBtn.style.display='none';
	if(searchString != ''){
		removeChildNodes(pokemonContainer);
		takePokemon(url,searchString,pokemonContainer);
		pokemonContainer.style.height = '100vh';
		searchPokemon.value =''	;
	} else {
		alert('Ingrese pokemon');
	}
});

buttonSearchPokemonTypes.addEventListener('click', (e) => {
	e.preventDefault();
	let searchString = searchPokemonTypes.value.toLowerCase();
	if(searchString != ''){
		removeChildNodes(pokemonContainer);
		takePokemonByType(url,searchString,pokemonContainer);
		searchPokemonTypes.value ='';
		pokemonContainer.style.height = '40rem';
		pokemonContainer.style.overflow = 'scroll';
		previousBtn.style.display='none';
		nextBtn.style.display='none';
	} else {
		alert('Ingrese tipo');
	}
});

toggleMenuElement.addEventListener('click', () => {
	mainMenuElement.classList.toggle('main-menu--show');
});