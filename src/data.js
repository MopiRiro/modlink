export const fetchPokemon = (url,id,container) => {
	fetch(`${url}/${id}`)
		.then(res => res.json())
		.then((data) => createPokemon(data,container));
};



export const createPokemon = (pokemon,container) =>{
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

	container.appendChild(card);
};


export const showModalDetail = () => {
	
};
