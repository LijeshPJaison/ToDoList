let todos = JSON.parse(localStorage.getItem('todos')) || [];

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const errorText = document.getElementById('errorText');
    const todoList = document.getElementById('todoList');

    errorText.textContent = '';

    const todoText = todoInput.value.trim();

    if (todoText.length < 4 || todoText.length > 200) {
        errorText.textContent = 'To-do item should be between 4 and 200 characters.';
        return;
    }

    const regex = /^[a-zA-Z0-9 ]*$/;
    if (!regex.test(todoText)) {
        errorText.textContent = 'Special characters are not allowed.';
        return;
    }

    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));

    todoInput.value = '';

    refreshTodoList();
}

function removeTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    refreshTodoList();
}

function refreshTodoList() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo;
        todoList.appendChild(li);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            removeTodo(index);
        };
        li.appendChild(deleteButton);
    });
}

refreshTodoList();