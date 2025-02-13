function buscarPokemon() {
    let nome = document.getElementById("pokemonNome").value.toLowerCase();
    let urlPokemon = `https://pokeapi.co/api/v2/pokemon/${nome}`;
    let urlEspecie = `https://pokeapi.co/api/v2/pokemon-species/${nome}`;

    fetch(urlPokemon)
        .then(response => {
            if (!response.ok) throw new Error("Pokémon não encontrado");
            return response.json();
        })
        .then(data => {
            document.getElementById("nome").textContent = data.name.toUpperCase();
            document.getElementById("imagem").src = data.sprites.front_default;
            document.getElementById("altura").textContent = data.height / 10 + " m";
            document.getElementById("peso").textContent = data.weight / 10 + " kg";

            let poderTotal = data.stats.reduce((total, stat) => total + stat.base_stat, 0);
            document.getElementById("poder").textContent = poderTotal + " (" + classificarPoder(poderTotal) + ")";

            return fetch(urlEspecie);
        })
        .then(response => {
            if (!response.ok) throw new Error("Informações adicionais não encontradas");
            return response.json();
        })
        .then(data => {
            let taxaCaptura = data.capture_rate;
            let raridade = definirRaridade(taxaCaptura);
            document.getElementById("raridade").textContent = raridade;
        })
        .catch(error => {
            document.getElementById("nome").textContent = "Pokémon não encontrado!";
            document.getElementById("imagem").src = "";
            document.getElementById("altura").textContent = "";
            document.getElementById("peso").textContent = "";
            document.getElementById("raridade").textContent = "";
            document.getElementById("poder").textContent = "";
        });
}

function definirRaridade(taxaCaptura) {
    if (taxaCaptura >= 200) return "Comum";
    if (taxaCaptura >= 100) return "Incomum";
    return "Raro";
}

function classificarPoder(poderTotal) {
    if (poderTotal >= 600) return "Lendário";
    if (poderTotal >= 450) return "Forte";
    if (poderTotal >= 300) return "Médio";
    return "Fraco";
}