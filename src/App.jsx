import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
function App() {
	//status editor
	const [inputText, setInputText] = useState("");
	const [todos, setTodos] = useState([]);
	const [status, setStatus] = useState("all");
	const [filtered, setFiltered] = useState([]);

	//effects editor
	useEffect(() => {
		getLocal();
	}, []);
	useEffect(() => {
		filterHandler();
		saveLocal();
	}, [todos, status]);

	//handler functions
	const saveLocal = () => {
		try {
			localStorage.setItem("todos", JSON.stringify(todos));
		} catch (error) {
			console.error("Error saving todos to local storage: ", error);
		}
	};

	const getLocal = () => {
		try {
			if (localStorage.getItem("todos") === null)
				localStorage.setItem("todos", JSON.stringify([]));
			else {
				let localTodos = JSON.parse(localStorage.getItem("todos"));
				setTodos(localTodos);
			}
		} catch (error) {
			console.error("Error getting todos from local storage: ", error);
		}
	};
	const filterHandler = () => {
		switch (status) {
			case "completed":
				setFiltered(todos.filter((todo) => todo.completed === true));
				break;
			case "uncompleted":
				setFiltered(todos.filter((todo) => todo.completed === false));
				break;
			default:
				setFiltered(todos);
				break;
		}
	};
	return (
		<>
			<header>
				<h1>Todo List</h1>
			</header>
			<Form
				inputText={inputText}
				todos={todos}
				setTodos={setTodos}
				setInputText={setInputText}
				setStatus={setStatus}
			/>
			<TodoList
				setTodos={setTodos}
				filtered={filtered}
				todos={todos}
			/>
		</>
	);
}

export default App;
