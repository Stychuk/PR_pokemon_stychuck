import Pokemon from "./pokemon.js";
import { $getElById, random } from "./utils.js";

const player1 = new Pokemon({
    name: 'Pikachu',
    type: 'electric',
    hp: 500,
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 450,
    selectors: 'enemy',
});

const $logs = document.querySelector('#logs');

const $btn = $getElById('btn-thunder-jolt');
const $btn2 = $getElById('btn-electro-ball');

const btnCountJolt = countBtn(6, $btn);
$btn.addEventListener('click', () => {
    btnCountJolt();
    player1.changeHP(random(60, 20), function(count) {
        console.log('Some change after change HP', count);
        console.log(generateLog(player1, player2, count)); 
    });
    player2.changeHP(random(60, 20), function(count) {
        console.log('Some change after change HP', count);
    });
});

const btnElectroBall = countBtn(10, $btn2);
$btn2.addEventListener('click', () => {
    btnElectroBall();
    player1.changeHP(random(20), function(count) {
        console.log('Some change after change HP', count); 
    });
    player2.changeHP(random(20), function(count) {
        console.log(generateLog(player2, player1, count)); 
        console.log('Some change after change HP', count);
    });
});

function countBtn(count = 6, el) {
    const innerText = el.innerText;
    el.innerText = `${innerText} (${count})`;
    return () => {
        count--;
        console.log(count);
        if(count === 0) {
            el.disabled = true;
        }
        el.innerText = `${innerText} (${count})`;
        return count;
    }
}

function changeHP(count) {
    this.hp.current -= count;

    const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
    //console.log(log);
    if(this.hp.current <= 0) {
        this.hp.current = 0;
        alert('Бедный '+ this.name +' проиграл бой!');
        $btn.disabled = true;
    }

    this.renderHP();
}

/*function generateLog(character, enemy, count) {
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
}*/

function generateLog(player1, player2, count) {
    const { name, hp: { current, total } } = player1;
    const { name: enemyName } = player2;

    const logs = [
        `${name} вспомнил что-то важное, но неожиданно ${enemyName}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${current}/${total}]`,
        `${name} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${current}/${total}]`,
        `${name} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${current}/${total}]`,
        `${name} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар. -${count}, [${current}/${total}]`,
        `${name} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${count}, [${current}/${total}]`,
        `${name} удивился, а ${enemyName} пошатнувшись влепил подлый удар. -${count}, [${current}/${total}]`,
        `${name} высморкался, но неожиданно ${enemyName} провел дробящий удар. -${count}, [${current}/${total}]`,
        `${name} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника. -${count}, [${current}/${total}]`,
        `${name} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника. -${count}, [${current}/${total}]`,
        `${name} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику. -${count}, [${current}/${total}]`
    ];

    return logs[random(logs.length)-1];
}