import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef();

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null;
  }
  // since the empty array will never be changed it will only run once
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])
  // useEffect() will wait for something to happen to the todos array and react to that change by saving the new todo
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    //below we are setting a copy of the state, and never should we directly change the state.
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete
    setTodos(newTodos);
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }
  return (
    <>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      <input ref={todoNameRef} type='text' />
      <button onChange={toggleTodo} onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear complete</button>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
  )
}

export default App;
