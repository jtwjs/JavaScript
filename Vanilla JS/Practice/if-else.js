const title = document.querySelector('#title');

const BASE_COLOR = "rgb(51, 51, 51)";
const OTHER_COLOR = "#889933";

function handleCheck(){
    const currentColor = title.style.color;
    
    if(currentColor === BASE_COLOR) {
        console.log("뭣이여 성공이여?");
        title.style.color = OTHER_COLOR;
    } else {
        console.log("뭣이여? 실패?");
        title.style.color = BASE_COLOR;
    }
}

function init(){
    title.style.color = BASE_COLOR;
    title.addEventListener('click',handleCheck);
}

init();