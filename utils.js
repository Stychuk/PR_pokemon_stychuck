export function getElById(id) {
    return document.getElementById(id);
}

export function random(max, min = 0) {
    const num = max - min;

    return Math.ceil(Math.random() * num) + min;
}

export function countClicks(limitClicks) {
    return () => limitClicks > 0 ? --limitClicks : limitClicks = 0;
}

export const changeButtonName = (btn, clicks) => {
    let btnName = btn.textContent.split(' ');

    btnName.splice(btnName.indexOf('('), 1);

    return `${btnName.join(' ')} (${clicks})`;
}