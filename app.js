//Selecteur
const todoInput = document.querySelector(".todo-input"); 
const todoButton = document.querySelector(".todo-button"); 
const todoList = document.querySelector(".todo-list"); 
const filterOption = document.querySelector(".filter-todo")

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
filterOption.addEventListener("click", filterTodo);

//Fonctions
function addTodo(event) {
    //Empeche le button de submit
    event.preventDefault();
    //Creation de la DIV Todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Creation du LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Ajouter todo au LocalStorage
    saveLocalTodos(todoInput.value)
    //Button de completion 
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"> </i>' ;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Button Poubelle 
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>' ;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Rattacher a la liste 
    todoList.appendChild(todoDiv);
    //Nettoyer l'input
    todoInput.value = ""
} 

function deletecheck(event){
    const item = event.target;
    //Supprimer une tache
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }
    //Completer la tache
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                console.log("h0")
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    console.log("hey2")
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;     
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    console.log("hey3")
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;     
        }
    })
}

function saveLocalTodos(todo){
    //Verifier si il y a deja une todo list save
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    //Verifier si il y a deja une todo list save
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //Creation de la DIV Todo
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //Creation du LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //Button de completion 
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"> </i>' ;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Button Poubelle 
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"> </i>' ;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Rattacher a la liste 
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    //Verifier si il y a deja une todo list save
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}