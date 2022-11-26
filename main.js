const logs = document.querySelector('#logs')

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
    enemy.changeHP(random(20));
});

const btnElectroBall = countBtn(10, $btn2);
$btn2.addEventListener('click', function() {
    btnElectroBall();
    character.changeHP(random(20));
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