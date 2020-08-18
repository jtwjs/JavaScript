const form_toDo = document.querySelector(".form_toDo"),
  input_toDo = form_toDo.querySelector("input");
const toDoContainer = document.querySelector(".toDoContainer");

const TODO_LS = "toDos2";
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoContainer.removeChild(li);

  const cleanToDos = toDos.filter(function (todo) {
    return todo.id !== parseInt(li.className);
  });

  toDos = cleanToDos;
  saveToDos();
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const toDoValue = input_toDo.value;
  paintToDo(toDoValue);
  input_toDo.value = "";
}

function paintToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  delBtn.classList.add("delBtn");
  delBtn.addEventListener("click", deleteToDo);
  delBtn.innerText = "🟣";
  span.innerText = `[${newId}] 　${text}`;
  li.classList.add(newId);
  li.appendChild(span);
  li.appendChild(delBtn);
  toDoContainer.appendChild(li);
  const toDoObj = {
    id: newId,
    text: text,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function loadToDoList() {
  const toDoList = localStorage.getItem(TODO_LS);
  if (toDoList !== null) {
    const parseToDos = JSON.parse(toDoList);
    parseToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDoList();
  form_toDo.addEventListener("submit", handleToDoSubmit);
}

init();
