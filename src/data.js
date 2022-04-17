export const fetchPokemon = (url, id, container) => {
	fetch(`${url}/${id}`)
		.then(res => res.json())
		.then((data) => createPokemon(url, data, container));
};

export const takePokemon = (url, pokemon, container) => {
	fetch(`${url}/${pokemon}`)
		.then(res => res.json())
		.then((data) => createPokemon(url, data, container));
};

export const takePokemonByType = (url, type, container) => {
	fetch(`https://pokeapi.co/api/v2/type/${type}/`)
		.then(res => res.json())
		.then((data) => {
			const namePokemons = data.pokemon.map( e => e.pokemon.name);
			for(let i=0; i< namePokemons.length; i++){
				takePokemon(url, namePokemons[i], container);
				
			}
		});
};

export const createPokemon = (url, pokemon, container) =>{
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
	buttonDetails.setAttribute('id', pokemon.name);
	buttonDetails.addEventListener('click', (e) => {
		const idPokemon = e.target.id;
		infoPokemon(url, idPokemon, container);
	});


	const numberPokemon = document.createElement('p');
	numberPokemon.textContent = `#${pokemon.id.toString().padStart(4,0)}`;

	const namePokemon = document.createElement('p');
	namePokemon.classList.add('name');
	namePokemon.textContent = pokemon.name;

	card.appendChild(containerImageCard);
	card.appendChild(numberPokemon);
	card.appendChild(namePokemon);
	card.appendChild(buttonDetails);

	container.appendChild(card);
};

export const infoPokemon = (url, namePokemon, container) => {
	fetch(`${url}/${namePokemon}`)
		.then(res => res.json())
		.then((data) => createdModal(data,container));
};


export const createdModal = (pokemon,container) => {
	const modalContainer = document.createElement('div');
	modalContainer.classList.add('pokemon-modal');
    
	const containerImageCard = document.createElement('div');
	containerImageCard.classList.add('img-container');

	const imageCard = document.createElement('img');
	imageCard.src = pokemon.sprites.front_default;

	containerImageCard.appendChild(imageCard);

	const buttonClose = document.createElement('button');

	buttonClose.textContent = 'Close';
	buttonClose.classList.add('btn-close');
	buttonClose.addEventListener('click', () => {
		modalContainer .remove();
	});

	const numberPokemon = document.createElement('p');
	numberPokemon.textContent = `#${pokemon.id.toString().padStart(4,0)}`;

	const namePokemon = document.createElement('p');
	namePokemon.classList.add('name');
	namePokemon.textContent =pokemon.name;

	const baseExperience = document.createElement('p');
	baseExperience.classList.add('base_experience');
	baseExperience.textContent =`Experiencia base: ${pokemon.base_experience}`;

	
	const abilitiesPokemon = document.createElement('p');
	abilitiesPokemon.classList.add('types_pokemon');
	
	abilitiesPokemon.textContent = `Habilidad:  ${pokemon.abilities[0].ability.name}`;
		
	modalContainer.appendChild(containerImageCard);
	modalContainer.appendChild(numberPokemon);
	modalContainer.appendChild(namePokemon);
	modalContainer.appendChild(abilitiesPokemon);
	modalContainer.appendChild(baseExperience);
	modalContainer.appendChild(buttonClose);

	container.appendChild(modalContainer);
};

export const removeChildNodes = (parent) =>{
	while (parent.firstChild){
		parent.removeChild(parent.firstChild);
	}
};