const form = document.querySelector(".form");
const input = document.querySelector(".form__input");
const ul = document.querySelector(".toDoList");
const addButton = document.querySelector(".btn");

let todosArray = []

function addNewTodo() {
    let newTodoTitle = input.value
    console.log(newTodoTitle);
    
    let newTodoObj = {
        id: todosArray.length + 1,
        title: newTodoTitle
    }

    input.value = ''

    todosArray.push(newTodoObj)
    setLocalStorage(todosArray)
    todosGenerator(todosArray)

    input.focus()
}

function setLocalStorage(todosList) {
    localStorage.setItem('todos', JSON.stringify(todosList))
}

function getLocalStorage() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    if (localStorageTodos) {
        todosArray = localStorageTodos
    } else {
        todosArray = []
    }

    todosGenerator(todosArray)

}

function todosGenerator(todosArray){
    let li;

    ul.innerHTML = '';

    todosArray.forEach(function(todo){
        console.log(todo);
        li = document.createElement('li')
        li.innerHTML = todo.title;
        li.setAttribute('onclick', 'removeTodo(' + todo.id + ')')
        
        ul.append(li)

    })
}

function removeTodo(todoId) {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todosArray = localStorageTodos

    let mainTodoIndex = todosArray.findIndex(function (todo) {
        return todo.id === todoId
    })

    todosArray.splice(mainTodoIndex, 1)

    setLocalStorage(todosArray)
    todosGenerator(todosArray)

}
window.addEventListener('load', getLocalStorage)
form.addEventListener("submit", e =>{
    e.preventDefault()
    addNewTodo()
})