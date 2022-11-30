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

function $getElById(id) {
    return document.getElementById(id);
}

const $btn = $getElById('btn-thunder-jolt');
const $btn2 = $getElById('btn-electro-ball');

const character = {
    name: 'Pikachu',
    type: 'electric',
    weakness: ['fighting', 'water'],
    resistance: ['steel'],
    hp: {
        current: 350,
        total: 350,
    },
    elHP: $getElById('health-character'),
    elProgressbar: $getElById('progressbar-character'),
    changeHP: changeHP, 
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}

const enemy = {
    name: 'Charmander',
    type: 'fire',
    weakness: ['fighting', 'water'],
    resistance: ['steel'],
    hp: {
        current: 340,
        total: 340,
    },
    elHP: $getElById('health-enemy'),
    elProgressbar: $getElById('progressbar-enemy'),
    changeHP: changeHP, 
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}

const btnCountJolt = countBtn(6, $btn);
$btn.addEventListener('click', function() {
    btnCountJolt();
    character.changeHP(random(20));
    //enemy.changeHP(random(20));
});

const btnElectroBall = countBtn(10, $btn2);
$btn2.addEventListener('click', function() {
    btnElectroBall();
    //character.changeHP(random(20));
    enemy.changeHP(random(20));
});

function countBtn(count = 6, el) {
    const innerText = el.innerText;
    el.innerText = `${innerText} (${count})`;
    return function() {
        count--;
        if(count === 0) {
            el.disabled = true;
        }
        el.innerText = `${innerText} (${count})`;
        return count;
    }
}

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function renderHPLife() {
    const { elHP, hp: { current, total } } = this;

    elHP.innerText = current + ' / '+ total;
}

function renderProgressbarHP() {
    const { hp: { current, total }, elProgressbar } = this;
    const procent = current / (total / 100);
    elProgressbar.style.width = procent + '%';
}

function changeHP(count) {
    this.hp.current -= count;

    const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
    console.log(log);
    if(this.hp.current <= 0) {
        this.hp.current = 0;
        alert('Бедный '+ this.name +' проиграл бой!');
        $btn.disabled = true;
    }

    this.renderHP();
}

function random(max, min = 0) {
    const num = max - min;
    return Math.ceil(Math.random() * num) + min;
}

init();