
document.addEventListener('DOMContentLoaded', function() {

    // Permet de récupérer la section de la carte du pokemon
    const pokemonSection = document.querySelector(".card");
    // Permet de récupérer l'id du pokemon dans l'url
    const urlParams = new URLSearchParams(window.location.search);
    let pokemonId = urlParams.get("id");


    // Permt de génére la carte du pokemon en fonction de son id
    function fetchAndDisplayPokemonById(pokemonId) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => response.json())
        .then((data) => {
            const pokemonImg = data.sprites.other.dream_world.front_default;

            pokemonSection.innerHTML = `
                    <h3 class="name" >${data.name}</h3>
                    <div class="type"></div>
                    <div class="img">
                        <img class="pokemon-img" src="${pokemonImg}" alt="${data.name}">
                        <img class="pokemon-background" src="./img/background.jpeg" alt="">
                    </div>
                    <div class="description">
                        <p class="stat">Statistiques de base</p>
                            <ul>
                                <li>HP: ${data.stats[0].base_stat}</li>
                                <li>Attaque: ${data.stats[1].base_stat}</li>
                                <li>Défense: ${data.stats[2].base_stat}</li>
                                <li>Attaque spéciale: ${data.stats[3].base_stat}</li>
                                <li>Défense spéciale: ${data.stats[4].base_stat}</li>
                                <li>Vitesse: ${data.stats[5].base_stat}</li>
                            </ul>
                    </div>
                            
                    <button class="panier">Add to cart</button>
            `;

            // Permet de générer les types du pokemon et de les afficher
            function generateType(types) {
                    for (let i = 0; i < types.length; i++) {
                        console.log(types[i].type.name);
                        const selectTypes = document.querySelector(".type");
                        const type = document.createElement("img");

                        type.src = `./img/type/${types[i].type.name}.png`;
                        type.alt = `${types[i].type.name}`;
                        selectTypes.appendChild(type);

                        // Permet de supprimer les classes de types précédents
                        const typesArray = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
                        typesArray.forEach(type => pokemonSection.classList.remove(type));

                        pokemonSection.classList.add(types[0].type.name);
                    
                    }
            }
            generateType(data.types);

            //  Permet de récupérer le panier dans le local storage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Permet d'ajouter le pokemon au panier
            function addToCart(pokemon) {
                cart.push(pokemon);
                localStorage.setItem('cart', JSON.stringify(cart));
            }

            // Permet de récupérer le bouton "add to cart" et d'ajouter le pokemon au panier
            document.querySelector('.panier').addEventListener('click', function(event) {
                event.preventDefault();

                // Récupérer les informations du Pokemon
                const pokemon = {
                    name: data.name,
                    image: data.sprites.front_default,
                };

            
                addToCart(pokemon);
            });



        })
    }
    
    // Lance la création de la carte du pokemon
    fetchAndDisplayPokemonById(pokemonId);

    // Permet de naviguer entre les pokemons sur la page pokemon.html
    document.getElementById('previousButton').addEventListener('click', function() {
        if (pokemonId> 1) { 
            pokemonId--;
            fetchAndDisplayPokemonById(pokemonId);
        }
    });

    document.getElementById('nextButton').addEventListener('click', function() {
        pokemonId++;
        fetchAndDisplayPokemonById(pokemonId);
    });

});

