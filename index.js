// Get the input field and add button
const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-todo-btn");

// Get the todo list from localStorage, or create an empty array if it doesn't exist
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Add any existing todos to the list on page load
todos.forEach(todo => {
  addTodoToPage(todo);
});

// Add a new todo to the list when the add button is clicked
addButton.addEventListener("click", () => {
  const newTodo = input.value.trim();

  // Prevent empty todos from being added to the list
  if (!newTodo) return;

  // Add the new todo to the beginning of the array and update localStorage
  todos.unshift(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));

  // Add the new todo to the list on the page and reset the input field
  addTodoToPage(newTodo);
  input.value = "";
});

// Remove a todo from the list when its delete button is clicked
document.addEventListener("click", event => {
  if (event.target.className === "delete-todo-btn") {
    const todoIndex = event.target.dataset.index;

    // Remove the todo from the array and update localStorage
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    // Remove the todo from the list on the page
    const todoItem = document.getElementById(`todo-${todoIndex}`);
    todoItem.parentNode.removeChild(todoItem);
  }
});

// Edit a todo in the list when its edit button is clicked
document.addEventListener("click", event => {
  if (event.target.className === "edit-todo-btn") {
    const todoIndex = event.target.dataset.index;
    const todoItem = document.getElementById(`todo-${todoIndex}`);
    const todoText = todoItem.firstChild.textContent;

    // Replace the todo item's text with an input field for editing
    todoItem.innerHTML = `
      <input type="text" id="edit-todo-${todoIndex}" value="${todoText}">
      <button class="save-todo-btn" data-index="${todoIndex}">Save</button>
    `;
  }
});

// Save an edited todo when its save button is clicked
document.addEventListener("click", event => {
  if (event.target.className === "save-todo-btn") {
    const todoIndex = event.target.dataset.index;
    const editedTodo = document.getElementById(`edit-todo-${todoIndex}`).value.trim();

    // Prevent empty todos from being saved
    if (!editedTodo) return;

    // Update the todo item's text and update localStorage
    todos[todoIndex] = editedTodo;
    localStorage.setItem("todos", JSON.stringify(todos));

    // Replace the input field with the updated todo text
    const todoItem = document.getElementById(`todo-${todoIndex}`);
    todoItem.innerHTML = `
      <span>${editedTodo}</span>
      <button class="edit-todo-btn" data-index="${todoIndex}">Edit</button>
      <button class="delete-todo-btn" data-index="${todoIndex}">Delete</button>
    `;
  }
});