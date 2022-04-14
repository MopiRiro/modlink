// import {fetchPokemon} from './data.js';

let pokemonContainer = document.querySelector('.container-pokemon');
const previousBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');
const sortBy = document.querySelector('#sortBy');
let searchPokemon = document.getElementById('search-pokemon');
let buttonSearchPokemon= document.getElementById('button-search-pokemon');

let url = 'https://pokeapi.co/api/v2/pokemon';

let offset = 1;
let limit = 8;

export const fetchPokemon = (url,id) => {
	fetch(`${url}/${id}`)
		.then(res => res.json())
		.then((data) => createPokemon(data));
};

export const traerPokemon = (namePokemon) => {
	fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
		.then(res => res.json())
		.then((data) => createPokemon(data));
};

// export const traerPokemon2 = () => {
// 	fetch('https://pokeapi.co/api/v2/ability/1')
// 		.then(res => res.json())
// 		.then((data) => console.log(data));
// };
// traerPokemon2();

// export const traerPokemon2 = (nameAbility) => {
// 	fetch(`https://pokeapi.co/api/v2/ability/${nameAbility}`)
// 		.then(res => res.json())
// 		.then((data) => {
// 			console.log(data.pokemon[0].pokemon.name);
// 			for( let i=0; data.pokemon[i].length >= i; i++){
// 				console.log(data.pokemon[i].pokemon.name);
// 			}
// 		});
// };
// // traerPokemon2();



export const createPokemon = (pokemon) =>{
	const card = document.createElement('div');
	card.classList.add('pokemon-item');
    
	const containerImageCard = document.createElement('div');
	containerImageCard.classList.add('img-container');

	const imageCard = document.createElement('img');
	imageCard.src = pokemon.sprites.front_default;

	containerImageCard.appendChild(imageCard);

	const buttonDetails = document.createElement('button');
	buttonDetails.textContent = 'Detalles';
	buttonDetails.classList.add('btn-details');

	const numberPokemon = document.createElement('p');
	numberPokemon.textContent = `#${pokemon.id.toString().padStart(4,0)}`;

	const namePokemon = document.createElement('p');
	namePokemon.classList.add('name');
	namePokemon.textContent =pokemon.name;

	
	card.appendChild(containerImageCard);
	card.appendChild(numberPokemon);
	card.appendChild(namePokemon);
	card.appendChild(buttonDetails);

	pokemonContainer.appendChild(card);
};


// const getPokemons = () => {
// 	fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
// 		.then(res => res.json())
// 		.then((data) => console.log(data.results));
// };

// getPokemons();


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
		fetchPokemon(url, i);
	}
};

fetchPokemons(offset,limit);

const removeChildNodes = (parent) =>{
	while (parent.firstChild){
		parent.removeChild(parent.firstChild);
	}
};

//Ordenando A-Z


sortBy.addEventListener('change', () => {
	let select = sortBy.options[sortBy.selectedIndex].text;
	removeChildNodes(pokemonContainer);
	console.log(select);
	
});



buttonSearchPokemon.addEventListener('click', (e) => {
	e.preventDefault();
	let searchString = searchPokemon.value.toLowerCase();
	if(searchString != ''){
		removeChildNodes(pokemonContainer);
		traerPokemon(searchString);
	} else {
		alert('Ingrese pokemon');
	}
});


// let searchPokemonSpecies = document.getElementById('search-pokemon-species');
// let buttonSearchPokemonSpecies = document.getElementById('button-search-pokemon-species');
// buttonSearchPokemonSpecies.addEventListener('click', (e) => {
// 	e.preventDefault();
// 	let searchString = searchPokemonSpecies.value.toLowerCase();
// 	if(searchString != ''){
// 		removeChildNodes(pokemonContainer);
		
// 	} else {
// 		alert('Ingrese pokemon');
// 	}
// });


// const navToggle = document.querySelector(".nav-toggle");
// const navMenu = document.querySelector(".nav-menu");

// navToggle.addEventListener('click', () => {
//   navMenu.classList.toggle("nav-menu_visible");
//   if (navMenu.classList.contains("nav-menu_visible")) {
//     navToggle.setAttribute("aria-label", "Close menu");
//   } else {
//     navToggle.setAttribute("aria-label", "Open menu");
//   }
// });

// const menuLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
// menuLinks.forEach(menuLink => {
//   menuLink.addEventListener('click', function () {
//     navMenu.classList.remove("nav-menu_visible");
//   })
// })

const toggleMenuElement = document.getElementById('toggle-menu');
const mainMenuElement = document.getElementById('main-menu');
toggleMenuElement.addEventListener('click', () => {
	mainMenuElement.classList.toggle('main-menu--show');
});