import { v4 as uuidv4 } from 'uuid'

let todos = []

// Read todos from localStorage
const readTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}

// Save todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const getTodos = () => todos

const createTodo = (text) => {
    if (text.length > 0) {
        todos.push({
            id: uuidv4(),
            text,
            completed: false
        })
        saveTodos(todos)
    }
}

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

// Toggle the checkbox
const toggleTodo = (id) => {
    const todo = todos.find((todo) => {
        return todo.id === id
    })

    if (todo) {
        todo.completed = !todo.completed
    }
    saveTodos()
}

readTodos()

export { getTodos, createTodo, removeTodo, toggleTodo, readTodos }