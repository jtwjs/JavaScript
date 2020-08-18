const timer = document.querySelector(".timer");

function getTimer() {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  timer.innerText = `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`;
}

function init() {
  getTimer();
  setInterval(getTimer, 1000);
}

init();
