// Get references to the HTML elements we'll interact with
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemCount = document.getElementById('item-count');
const filterButtons = document.querySelectorAll('.filters button');
const clearCompletedButton = document.getElementById('clear-completed');

// Get a reference to the body element and the mode toggle icons
const body = document.body;
const darkModeIcon = document.getElementById('dark-mode-icon');
const lightModeIcon = document.getElementById('light-mode-icon');

// Initialize arrays to hold all todos and the currently filtered todos
let todos = [];
let filteredTodos = [];

// Function to update the displayed list of todos
function renderTodos() {
    // Clear the current list
    todoList.innerHTML = '';
    // Create and append a list item for each todo in filteredTodos
    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        // If the todo is completed, add the 'completed' class
        if (todo.completed) {
            li.classList.add('completed');
        }
        todoList.appendChild(li);
    });
    // Update the count of uncompleted todos
    itemCount.textContent = `${filteredTodos.filter(todo => !todo.completed).length} items left`;
}

// Function to switch between light and dark mode
function toggleMode() {
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        lightModeIcon.style.display = 'none';
        darkModeIcon.style.display = '';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        darkModeIcon.style.display = 'none';
        lightModeIcon.style.display = '';
    }
}

// Set up the event listeners
darkModeIcon.addEventListener('click', toggleMode);
lightModeIcon.addEventListener('click', toggleMode);

// Event handler for adding a todo
function addTodo(event) {
    // If the 'Enter' key was pressed and the input is not empty
    if (event.key === 'Enter' && todoInput.value.trim() !== '') {
        // Create a new todo object
        const newTodo = {
            text: todoInput.value.trim(),
            completed: false
        };
        // Add the new todo to the todos array and update filteredTodos and the displayed list
        todos.push(newTodo);
        filteredTodos = todos;
        renderTodos();
        // Clear the input field
        todoInput.value = '';
    }
}

// Event handler for toggling a todo's completion status
function toggleTodo(event) {
    // If a list item was clicked
    if (event.target.tagName === 'LI') {
        // Find the clicked todo in the todos array
        const index = todos.findIndex(todo => todo.text === event.target.textContent);
        // Toggle its completion status and update the displayed list
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }
}

// Function to filter the displayed todos
function filterTodos(filter) {
    // Set filteredTodos to a filtered version of todos based on the filter
    switch (filter) {
        case 'all':
            filteredTodos = todos;
            break;
        case 'active':
            filteredTodos = todos.filter(todo => !todo.completed);
            break;
        case 'completed':
            filteredTodos = todos.filter(todo => todo.completed);
            break;
    }
    // Update the displayed list
    renderTodos();
}

// Event handler for clearing completed todos
function clearCompleted() {
    // Remove completed todos from the todos array and update filteredTodos and the displayed list
    todos = todos.filter(todo => !todo.completed);
    filteredTodos = todos;
    renderTodos();
}

// Set up event listeners
todoInput.addEventListener('keyup', addTodo); // Add a todo when 'Enter' is pressed in the input field
todoList.addEventListener('click', toggleTodo); // Toggle a todo's completion status when it's clicked
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // When a filter button is clicked, remove the 'active' class from all buttons, add it to the clicked button, and filter the todos
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterTodos(button.id.split('-')[0]);
    });
});
clearCompletedButton.addEventListener('click', clearCompleted); // Clear completed todos when the button is clicked

// Display the initial list of todos (which is empty)
renderTodos();