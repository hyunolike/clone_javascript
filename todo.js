const toDoForm = document.querySelector(".js-todoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-todoList");

const TODOS_LS = 'todos';

let toDos = [] ;

function deleteToDo(event) {
    const btn = event.target;
    const li =btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(toDo=>{
        return toDo.id !== parseInt(li.id);
    })
}

function saveToDos() {
    // JSON.stringify는 자바스크립트 object를 string으로 바꾸어준다
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
    toDos = cleanToDos; // 배열을 바꾸어준다.
    saveToDos();
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText ="❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        id: newId,
        text: text
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "" ;
}

function loadToDos() {
    const loadedToDos= localStorage.getItem(TODOS_LS);
    if(loadedToDos!== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach((toDo)=>{
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();


