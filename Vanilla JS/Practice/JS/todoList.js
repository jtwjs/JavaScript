
(() => {
  const body = document.querySelector("body");
  const PENDING = "pending";
  const FINISHED = "finished";
  let pendingList = [];
  let finishedList = [];

  (function createElem() {
    const inputBar = document.createElement("input");
    inputBar.setAttribute("placeholder", "Add task");
    const pendingWrap = document.createElement("div");
    pendingWrap.setAttribute("id", "pending");
    const pendingTitle = document.createElement("h2");
    pendingTitle.innerText = "Pending";
    pendingWrap.appendChild(pendingTitle);
    const pendingListWrap = document.createElement("ul");
    pendingWrap.appendChild(pendingListWrap);
    const finishedWrap = document.createElement("div");
    finishedWrap.setAttribute("id", "finished");
    const finishedTitle = document.createElement("h2");
    finishedTitle.innerText = "Finished";
    finishedWrap.appendChild(finishedTitle);
    const finishedListWrap = document.createElement("ul");
    finishedWrap.appendChild(finishedListWrap);
    body.appendChild(inputBar);
    body.appendChild(pendingWrap);
    body.appendChild(finishedWrap);
  })();

  function removeHandler() {
    const li = this.parentNode;

    const ul = li.parentNode;
    const id = this.parentNode.id;
    ul.removeChild(li);
    switch (ul.parentNode.id) {
      case "pending":
        pendingList = pendingList.filter((x) => x.id !== Number(id));
        break;
      case "finished":
        finishedList = finishedList.filter((x) => x.id !== Number(id));
        break;
      default:
        break;
    }

    saveList();
  }

  function saveList() {
    localStorage.setItem(PENDING, JSON.stringify(pendingList));
    localStorage.setItem(FINISHED, JSON.stringify(finishedList));
  }

  function paintFinishedList(value) {
    const finishedWrap = document.getElementById("finished");
    const ul = finishedWrap.querySelector("ul");
    const newId = finishedList.length;
    const li = document.createElement("li");
    const span = document.createElement("span");
    const removeBtn = document.createElement("button");
    const pendingBtn = document.createElement("button");
    span.innerText = value + " ";
    removeBtn.innerText = "❌";
    removeBtn.addEventListener("click", removeHandler);
    pendingBtn.innerText = "❕";
    pendingBtn.addEventListener("click", function () {
      removeHandler.bind(this)();
      paintPendingList(value);
    });

    li.id = newId;
    li.appendChild(span);
    li.appendChild(removeBtn);
    li.appendChild(pendingBtn);
    ul.appendChild(li);
    finishedWrap.appendChild(ul);

    const finishedObj = {
      id: newId,
      text: value
    };

    finishedList.push(finishedObj);
    saveList();
  }

  function paintPendingList(value) {
    const pendingWrap = document.getElementById("pending");
    const ul = pendingWrap.querySelector("ul");
    const newId = pendingList.length;
    const li = document.createElement("li");
    const span = document.createElement("span");
    const removeBtn = document.createElement("button");
    const finishBtn = document.createElement("button");
    span.innerText = value + " ";
    removeBtn.innerText = "❌";
    removeBtn.addEventListener("click", removeHandler);
    finishBtn.innerText = "✔";
    finishBtn.addEventListener("click", function () {
      removeHandler.bind(this)();
      paintFinishedList(value);
    });
    li.id = newId;
    li.appendChild(span);
    li.appendChild(removeBtn);
    li.appendChild(finishBtn);
    ul.appendChild(li);
    pendingWrap.appendChild(ul);
    const pendingObj = {
      id: newId,
      text: value
    };
    pendingList.push(pendingObj);
    saveList();
  }

  function inputHandler() {
    const value = this.value;
    paintPendingList(value);
    this.value = "";
  }

  function loadList() {
    const pending = localStorage.getItem(PENDING);
    const finished = localStorage.getItem(FINISHED);

    if (pending) {
      const parsePending = JSON.parse(pending);
      for (let obj of parsePending) paintPendingList(obj.text);
    }
    if (finished) {
      const parseFinished = JSON.parse(finished);
      for (let obj of parseFinished) paintFinishedList(obj.text);
    }
  }

  const input = document.querySelector("input");
  input.addEventListener("change", inputHandler);
  loadList();
})();
