// Permet de récupérer le panier dans le local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];


let cartContainer = document.querySelector('.wrapper-cart');

// Permet de vider le panier
cartContainer.innerHTML = '';

// Permet de créer une carte pour chaque pokemon dans le panier
cart.forEach((pokemon,index) => {
    let pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon-cart');

    let pokemonName = document.createElement('h3');
    pokemonName.textContent = pokemon.name;
    pokemonDiv.appendChild(pokemonName);

    let pokemonImg = document.createElement('img');
    pokemonImg.src = pokemon.image;
    pokemonDiv.appendChild(pokemonImg);

    // Permet de créer le bouton "remove"
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';

    // Permet de supprimer le pokemon du panier
    removeButton.addEventListener('click', function() {
        //  Supprime le pokemon du panier 
        cart.splice(index, 1);

        // Met à jour le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Supprime le pokemon du container
        cartContainer.removeChild(pokemonDiv);

        // Met à jour le total
        let totalDiv = document.querySelector('.total');
        totalDiv.textContent = `Total: ${cart.length}`;

    })
        
    pokemonDiv.appendChild(removeButton);

    cartContainer.appendChild(pokemonDiv);
        
});


// Ajoute le total des pokemons dans le panier
let total = 0;

cart.forEach(pokemon => {
    total += 1;

    let totalDiv = document.querySelector('.total');
    totalDiv.textContent = `Total: ${total}`;
});

// Permet de vider le panier
let clear = document.querySelector('.clearButton');
clear.addEventListener('click', function() {
    // Vide le panier
    cart = [];

    // Met à jour le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Vide le container
    cartContainer.innerHTML = '';

    // Met à jour le total
    let totalDiv = document.querySelector('.total');
    totalDiv.textContent = `Total: ${cart.length}`;
});
