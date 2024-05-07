import Todo from "./Todo";

const TodoList = ({ todos, setTodos, filtered }) => {
	return (
		<div className="todo-container">
			<ul className="todo-list">
				{filtered.map((todo) => (
					<Todo
						text={todo.text}
						setTodos={setTodos}
						todos={todos}
						key={todo.id}
						todo={todo}
					/>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
