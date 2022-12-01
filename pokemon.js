class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, hp, type, selectors, img, attacks }) {
        super(selectors);

        this.img = img;
        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.attacks = attacks;

        this.renderHP();
    }

    changeHP = (count) => {
        this.hp.current -= count;

        if (this.hp.current <= 0) {
            this.hp.current = 0;
            alert(this.name + ' проиграл!');
        }

        this.renderHP();
        return count;
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife = () => {
        const { elHP, hp: { current, total } } = this;
        elHP.textContent = current + ' / ' + total;
    }

    renderProgressbarHP = () => {
        const { hp: { current, total }, elProgressbar } = this;
        const procent = (current / total) * 100;
        elProgressbar.style.width = procent + '%';

        if (procent < 60 && procent > 20) {
            elProgressbar.classList.add('low');
        }
        else if (procent < 20) {
            elProgressbar.classList.add('critical');
        }
    }
}

export default Pokemon;