import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TodoContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
`;

const TodoInput = styled.input`
	flex: 1;
	padding: 8px;
	margin-right: 10px;
	border: none;
	border-radius: 4px;
	font-size: 16px;
`;

const TodoButton = styled.button`
	background-color: #007bff;
	color: white;
	border: none;
	padding: 8px 12px;
	cursor: pointer;
	border-radius: 4px;
	font-size: 16px;
`;

const TodoItem = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 5px;
	background-color: ${({ isToday }) => (isToday ? "yellowgreen" : "white")};
`;

const TodoText = styled.span`
	flex: 1;
	margin-right: 10px;
	text-decoration: ${({ isCompleted }) =>
		isCompleted ? "line-through" : "none"};
	font-size: 16px;
`;

const TodoDeleteButton = styled.button`
	background-color: #dc3545;
	color: white;
	border: none;
	padding: 4px 8px;
	cursor: pointer;
	border-radius: 4px;
	font-size: 14px;
	margin-right: 4px;
`;

const TodoCancelButton = styled.button`
	background-color: #6c757d;
	color: white;
	border: none;
	padding: 4px 8px;
	cursor: pointer;
	border-radius: 4px;
	font-size: 14px;
	margin-right: 4px;
`;

const TodoEditButton = styled.button`
	background-color: #007bff;
	color: white;
	border: none;
	padding: 4px 8px;
	cursor: pointer;
	border-radius: 4px;
	font-size: 14px;
	margin-right: 4px;
`;

const TodoCompleteButton = styled.button`
	background-color: #28a745;
	color: white;
	border: none;
	padding: 4px 8px;
	cursor: pointer;
	border-radius: 4px;
	font-size: 14px;
	margin-right: 4px;
`;

const TodoCheckbox = styled.input`
	margin-right: 5px;
`;

const DeleteSelectedButton = styled.button`
	background-color: #dc3545;
	color: white;
	border: none;
	padding: 8px 12px;
	cursor: pointer;
	border-radius: 4px;
	font-size: 16px;
	margin-top: 10px;
`;

function Todo() {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const storedTodos = localStorage.getItem("todos");
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleAddTodo = () => {
		if (inputValue.trim() !== "") {
			const newTodo = {
				id: Date.now(),
				text: inputValue,
				isEditable: false,
				isChecked: false,
				isCompleted: false,
				date: new Date().toISOString().slice(0, 10),
			};
			setTodos([...todos, newTodo]);
			setInputValue("");
		}
	};

	const handleDeleteTodo = (id) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	};

	const handleEditTodo = (id, newText) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, text: newText } : todo
		);
		setTodos(updatedTodos);
	};

	const handleCancelEdit = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, isEditable: false } : todo
		);
		setTodos(updatedTodos);
	};

	const handleSaveEdit = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, isEditable: false } : todo
		);
		setTodos(updatedTodos);
	};

	const handleEditButtonClick = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, isEditable: true } : todo
		);
		setTodos(updatedTodos);
	};

	const handleCheckboxChange = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
		);
		setTodos(updatedTodos);
	};

	const handleCompleteTodo = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
		);
		setTodos(updatedTodos);
	};

	const handleDeleteSelected = () => {
		const updatedTodos = todos.filter((todo) => !todo.isChecked);
		setTodos(updatedTodos);
	};

	return (
		<div>
			<TodoContainer>
				<TodoInput
					type="text"
					placeholder="Enter a task"
					value={inputValue}
					onChange={handleInputChange}
				/>
				<TodoButton onClick={handleAddTodo}>Add</TodoButton>
			</TodoContainer>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					isEditable={todo.isEditable}
					isToday={todo.date === new Date().toISOString().slice(0, 10)}
				>
					<TodoCheckbox
						type="checkbox"
						checked={todo.isChecked || false}
						onChange={() => handleCheckboxChange(todo.id)}
					/>
					{todo.isEditable ? (
						<>
							<TodoInput
								type="text"
								value={todo.text}
								onChange={(e) => handleEditTodo(todo.id, e.target.value)}
							/>
							<TodoCancelButton onClick={() => handleCancelEdit(todo.id)}>
								Cancel
							</TodoCancelButton>
							<TodoButton onClick={() => handleSaveEdit(todo.id)}>
								Save
							</TodoButton>
						</>
					) : (
						<>
							<TodoText isCompleted={todo.isCompleted}>{todo.text}</TodoText>
							{!todo.isEditable && (
								<>
									<TodoDeleteButton onClick={() => handleDeleteTodo(todo.id)}>
										Delete
									</TodoDeleteButton>
									<TodoEditButton
										onClick={() => handleEditButtonClick(todo.id)}
									>
										Edit
									</TodoEditButton>
									{!todo.isCompleted ? (
										<TodoCompleteButton
											onClick={() => handleCompleteTodo(todo.id)}
										>
											Complete
										</TodoCompleteButton>
									) : (
										<TodoCompleteButton
											onClick={() => handleCompleteTodo(todo.id)}
										>
											Cancel
										</TodoCompleteButton>
									)}
								</>
							)}
						</>
					)}
				</TodoItem>
			))}
			<DeleteSelectedButton onClick={handleDeleteSelected}>
				Delete Selected
			</DeleteSelectedButton>
		</div>
	);
}

export default Todo;
