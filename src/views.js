import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

// Filter the todos and render
const renderTodos = () => {
    const todoElement = document.querySelector('#todos')
    const filters = getFilters()
    const filteredTodos = getTodos().filter((todo) => {
        const setSearchMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const setCheckboxMatch = !filters.hideCompleted || !todo.completed
        return setSearchMatch && setCheckboxMatch
    })

    todoElement.innerHTML = ''

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoElement.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo, index) => {
            todoElement.appendChild(generateTodoDOM(todo, index))
        })
    } else {
        const messageElement = document.createElement('p')
        messageElement.classList.add('empty-message')
        messageElement.textContent = 'No to-dos to show.'
        todoElement.appendChild(messageElement)
    }
}


// Get the DOM elements for an individual note
const generateTodoDOM = (todo, index) => {
    const todoElement = document.createElement('label')
    const containerElement = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    //checkbox.setAttribute('type', 'checkbox')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.completed
    containerElement.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })

    // Setup todo text
    todoText.textContent = `${index + 1}. ${todo.text}`
    containerElement.appendChild(todoText)

    // Setup Container
    todoElement.classList.add('list-item')
    containerElement.classList.add('list-item__container')
    todoElement.appendChild(containerElement)

    // Setup remove button
    removeButton.textContent = 'Remove'
    removeButton.classList.add('button', 'button--text')
    todoElement.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoElement
}


// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h3')
    summary.classList.add('list-title')
    summary.textContent = incompleteTodos.length !== 1 ? `You have ${incompleteTodos.length} uncompleted tasks.` : `You have ${incompleteTodos.length} uncompleted task.`
    return summary
}

export { renderTodos, generateTodoDOM, generateSummaryDOM }