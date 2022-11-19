//  Main JS
var outroPokemon = document.getElementById('refresh');
var pokemonImagem = document.getElementById('pokemonImagem');
var pokemonName;
var right_answer;
var options = document.querySelectorAll('.question__single-answer');

var max_pokemon = 906;
var question__answers = document.getElementById("question__answers");
window.onload = function() {
    // códigos JavaScript a serem executados quando a página carregar
    random_pokemon();
}
async function fetchPokemon(pokemon) {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    const data = await APIResponse.json();


    return data;
}
async function renderPokemon(pokemon) {
    const data = await fetchPokemon(pokemon);
    pokemonImagem.src = data['sprites']['other']["official-artwork"]["front_default"];
    console.log(data.name);
}
async function renderOption(pokemon) {
    const data = await fetchPokemon(pokemon);
    return data.name;
}
async function random_pokemon() {
    let random = Math.floor(Math.random() * max_pokemon);

    renderPokemon(random);

    option(random);

}

async function option(answer) {

    let opt = [];
    let option_one = await generate_option(0, answer);
    let option_two = await generate_option(answer, max_pokemon);
    answer = await renderOption(answer);
    right_answer = answer;
    opt.push(answer);
    opt.push(option_one);
    opt.push(option_two);

    opt = shuffle(opt);
    for (var i = 0; i < question__answers.children.length; i++) {

        if (question__answers.children[i].tagName == "BUTTON")
            question__answers.children[i].innerHTML = opt[i];
    }

    console.log(opt);
}

function answer(e, option) {
    if (option == right_answer) {
        e.classList.add('right');
        pokemonImagem.classList.remove('contrast');
    } else e.classList.add('wrong');
}
async function generate_option(min, max) {
    max = Math.floor(max);
    min = Math.ceil(min) + 1;
    let random_number = Math.floor(Math.random() * (max - min + 1)) + min;
    let option = await renderOption(random_number);
    return option;

}

function shuffle(array) {
    var m = array.length,
        t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function remove_before_classes() {
    options.forEach(e => {
        e.classList.remove('wrong');
        e.classList.remove('right');
        pokemonImagem.classList.add('contrast');
    });
}
outroPokemon.addEventListener('click', function() {
    remove_before_classes();
    random_pokemon();
});


options.forEach(e => {
    e.addEventListener('click', function() {
        let choiced = e.textContent;
        answer(e, choiced);
    });
});