document.addEventListener('DOMContentLoaded', function() {
   
    //Affichage dynamique des produits en utilisant PokeAPI.  
    const selectPokemonSection = document.querySelector(".wrapper-pokemon");

    // Permet de récupérer le panier dans le local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    

    // Fonction pour créer une carte de pokemon
    function createPokemonCard(pokemonName) {
    
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        .then((response) => response.json())
        .then((data) => {
            const pokemonImg = data.sprites.front_default;

            const pokemonCard = document.createElement("div");
            pokemonCard.classList.add("card-pokemon");
            let types = data.types;

            pokemonCard.innerHTML = `
                    <h3 class="pokemonName" >${pokemonName}</h3>
                    <div class="type"></div
                    <div class="type"></div>
                    <img class="pokemonImg" src="${pokemonImg}" alt="${pokemonName}">
            `;

            selectPokemonSection.appendChild(pokemonCard);
            generateType(types, pokemonCard);

            // Permet de mettre l'id du pokemon dans l'url
            addUrl(pokemonCard, data.id);


            // Permet de générer les types du pokemon et de les afficher
            function generateType(types, pokemonCard) {
                const typeDiv = pokemonCard.querySelector('.type');
                typeDiv.innerHTML = '';
                
                types.forEach(type => {
                    const typeImg = document.createElement('img');
                    typeImg.src = `./img/type/${type.type.name}.png`;
                    typeImg.alt = type.type.name;
                    typeDiv.appendChild(typeImg);
                    pokemonCard.classList.add(types[0].type.name);

                    
                    
                });
                
            }

            // Création du bouton "add to cart"
            let addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to cart';
            addToCartButton.addEventListener('click', function(event) {

                //  Permet de ne pas ouvrir la page du pokemon 
                event.stopPropagation();
                
                // Permet de récupérer le nom et l'image du pokemon
                const pokemon = {
                    name: data.name,
                    image: data.sprites.front_default,
                };

                
                addToCart(pokemon);

                addToCartButton.classList.add('animate-add-to-cart');

                setTimeout(function() {
                    addToCartButton.classList.remove('animate-add-to-cart');
                }, 500);
            });
            pokemonCard.appendChild(addToCartButton);
        });
    }

         
    // Fonction mettre le nom du pokemon dans l'url
    function addUrl (pokemonCard, pokemonId) {
         pokemonCard.addEventListener("click", function() {
            window.location.href = `pokemon.html?id=${pokemonId}`;
        });
    }


    // Fonction pour afficher les 20 premiers pokemons et le bouton "voir plus"
    let limit = 20;
    let offset = 0

    function fetchAndDisplayPokemon() {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then((response) => response.json())
        .then((data) => {
            const pokemonNames = data.results.map((pokemon) => pokemon.name);

            pokemonNames.forEach((name) => {
                createPokemonCard(name);
            });
        });
    }

    fetchAndDisplayPokemon();

    // Fonction pour afficher les 20 pokemons suivants
    function seeMore(event) {
        event.preventDefault(); 
        offset += limit; 
        fetchAndDisplayPokemon(); 
    }

    document.getElementById('moreButton').addEventListener('click', seeMore);

    // Fonction pour afficher le bouton "scroll to top"
    window.onscroll = function() {
        const scrollToTopButton = document.getElementById('scrollToTopButton');
       
        if (document.documentElement.scrollTop > 100) {
            scrollToTopButton.style.display = 'flex';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    };
    
    // Fonction pour faire remonter en haut de la page
    document.getElementById('scrollToTopButton').addEventListener('click', function() {
       
        document.documentElement.scrollTop = 0; 
    });


    // Fonction pour ajouter un pokemon au panier
    function addToCart(pokemon) {
        cart.push(pokemon);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
   
})


