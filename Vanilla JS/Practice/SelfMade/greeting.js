const form = document.querySelector(".form_name"),
  input = form.querySelector("input"),
  h3 = form.querySelector("h3");
const greetingSection = document.querySelector(".main_title");

const USER_NAME = "userName",
  SHOWING_CN = "showing";

function saveLocation(text) {
  localStorage.setItem(USER_NAME, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const nameValue = input.value;
  saveLocation(nameValue);
  paintingGreeting(nameValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintingGreeting(text) {
  form.classList.remove(SHOWING_CN);
  const h2 = document.createElement("h2");
  h2.innerText = `Hello ${text} Good Luck Today To!`;
  h2.classList.add("greeting");
  greetingSection.appendChild(h2);
}

function loadName() {
  const name = localStorage.getItem(USER_NAME);
  if (name === null) {
    askForName();
  } else {
    paintingGreeting(name);
  }
}

function init() {
  loadName();
}

init();
