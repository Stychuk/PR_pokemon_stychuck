import Pokemon from "./pokemon.js";
import { getElById, random, countClicks, changeButtonName } from './utils.js';
import { pokemons } from "./pokemons.js";

const pokemonsVariants = [...pokemons];

function getRandomPlayer() {
    return pokemonsVariants.splice(random(pokemonsVariants.length) - 1, 1)[0];
}

const player1 = new Pokemon({
    ...getRandomPlayer(),
    selectors: 'character',
});

const player2 = new Pokemon({
    ...getRandomPlayer(),
    selectors: 'enemy',
});

const $control = document.querySelector('.control');

player1.attacks.forEach(item => {
    console.log(item);
    const $btn = document.createElement('button');
    $btn.classList.add('button');

    $btn.textContent = `${item.name} (${item.maxCount})`;
    const attack = kick(item, $btn);
    $btn.addEventListener('click', () => {
        console.log('Click button', $btn.innerText);
        attack();
    });

    $control.appendChild($btn);
});

function kick({ minDamage: player1_MinDamage, maxDamage: player1_MaxDamage, maxCount }, btn) {
    const remainClicks = countClicks(maxCount);

    return () => {
        const { minDamage: player2_MinDamage, maxDamage: player2_MaxDamage } = player2.attacks[random(player2.attacks.length) - 1];

        generateLog(player2, player1, player2.changeHP(random(player1_MinDamage, player1_MaxDamage)));
        generateLog(player1, player2, player1.changeHP(random(player2_MinDamage, player2_MaxDamage)));

        const clicksNumber = remainClicks();

        btn.textContent = changeButtonName(btn, clicksNumber);

        if (!clicksNumber) btn.disabled = true;

        if (!player1.hp.current || !player2.hp.current) {
            document.querySelectorAll('.button').forEach(button => button.disabled = true);
        }
    }
}

const $logs = document.querySelector('#logs');

function generateLog(character, enemy, count) {
    const logs = [
        `${character.name} вспомнил что-то важное, но неожиданно ${enemy.name}, не помня себя от испуга, ударил в предплечье врага.`,
        `${character.name} поперхнулся, и за это ${enemy.name} с испугу приложил прямой удар коленом в лоб врага.`,
        `${character.name} забылся, но в это время наглый ${enemy.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `${character.name} пришел в себя, но неожиданно ${enemy.name} случайно нанес мощнейший удар.`,
        `${character.name} поперхнулся, но в это время ${enemy.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
        `${character.name} удивился, а ${enemy.name} пошатнувшись влепил подлый удар.`,
        `${character.name} высморкался, но неожиданно ${enemy.name} провел дробящий удар.`,
        `${character.name} пошатнулся, и внезапно наглый ${enemy.name} беспричинно ударил в ногу противника.`,
        `${character.name} расстроился, как вдруг, неожиданно ${enemy.name} случайно влепил стопой в живот соперника.`,
        `${character.name} пытался что-то сказать, но вдруг, неожиданно ${enemy.name} со скуки, разбил бровь сопернику.`
    ];

    let log = logs[random(logs.length) - 1];

    const $p = document.createElement('p');
    $p.innerText = `${log} -${count} [${character.hp.current}/${character.hp.total}]`;
    $logs.insertBefore($p, $logs.children[0]);
    $logs.scrollTop = 0;
}

function init() {
    console.log('Start Game!');

    document.querySelector('.character img').src = player1.img;
    document.querySelector('.enemy img').src = player2.img;
    getElById('name-character').textContent = player1.name;
    getElById('name-enemy').textContent = player2.name;
}

init();