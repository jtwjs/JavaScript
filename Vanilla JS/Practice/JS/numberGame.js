(() => {

const rangeElem = document.querySelector('.range');
const maxNumberElem = document.querySelector('.maxNumber');
const numberInputElem = document.querySelector('.number');
const playBtnElem = document.querySelector('.playBtn');
const resultNumberElem = document.querySelector('.resultNumber');
const resultResultElem = document.querySelector('.resultResult');
const MAX_VALUE = 200;
const MIN_VALUE = 10;
let maxNumber = MIN_VALUE;



function setRange() {
    maxNumber = MIN_VALUE;
    const value = Math.round((MAX_VALUE - MIN_VALUE) * this.value / 100);
    maxNumber += value;
    maxNumberElem.innerText = maxNumber;
}

function resultHandler(number) {
    const number2 = Math.round(Math.random() * maxNumber) +"";
    const result = number === number2 ? "You Won": "You Lose";
    
    resultNumberElem.innerText = `You chose: ${number}, the machine chose: ${number2}.`;
    resultResultElem.innerText = `${result}`;
}

function clickHandler() {
 if(!numberInputElem.value) return;
const number = numberInputElem.value;
 resultHandler(number);

}

function init() {
    rangeElem.addEventListener('input', setRange);
    playBtnElem.addEventListener('click', clickHandler);
};


init();
})();