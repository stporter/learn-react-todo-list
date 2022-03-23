import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
	const [todos, setTodos] = useState([]);
	const todoNameRef = useRef();

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		if (storedTodos) setTodos(storedTodos);
	}, []);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	function toggleTodo(id) {
		const newTodos = [...todos];
		const todo = newTodos.find((todo) => todo.id === id);
		todo.complete = !todo.complete;
		setTodos(newTodos);
	}

	function handleAddTodo(e) {
		const name = todoNameRef.current.value;
		if (name === '') return;
		setTodos((prevTodos) => {
			return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
		});
		todoNameRef.current.value = null;
	}

	function handleClearTodos() {
		const newTodos = todos.filter((todo) => !todo.complete);
		setTodos(newTodos);
	}

	return (
		<>
			<TodoList todos={todos} toggleTodo={toggleTodo} />
			<input ref={todoNameRef} type='text' />
			<button onClick={handleAddTodo}>Add Todo</button>
			<button onClick={handleClearTodos}>Clear Complete</button>
			<div>{todos.filter((todo) => !todo.complete).length} left to do</div>
		</>
	);
}

export default App;

// React manages STATE inside of your application and when that STATE changes, it re-renders things for us - we want to store all of our "todos" inside of a state so that we can render the "todos" and anytime we change a todo, add a todo, delete a todo it will rerender the entire componenet tree for us

// to use STATE in a function component we need to import  the { useState } hook at the top of the page

// then we call the useState() function and we want to pass it the default state - the first time our todo list app loads we want to use an empty array because we have no todos yet

// useState returns an array so we can destructure that array and then set it to useState - the first element is all of our todos and the second element is a function that allows us to update our todos [todos, setTodos]

// all componenets are going to have "props" that we can pass to them just like we pass attributes to an HTML element - we have a prop todos on our todo list and we want to pass the todos variable to that prop todos
