import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TodoPage = styled.div`
	background-color: white;
	padding: 22px;
`;

const TodoContainer = styled.div`
	display: flex;
	align-items: center;
	border-radius: 10px;
	background: #ffffff;
	box-shadow: inset 6px 6px 20px #cccccc, inset -6px -6px 20px #ffffff;
	position: relative;
	margin-bottom: 10px;
`;

const TodoInput = styled.input`
	width: 32vw;
	padding: 10px;
	border: none;
	border-radius: 4px;
	font-size: 16px;
	background-color: rgba(0, 0, 0, 0);

	&:focus {
		outline: none;
	}
`;

const TodoButton = styled.button`
	background-color: #007bff;
	position: absolute;
	right: 0;
	color: grey;
	font-weight: 900;
	border: none;
	padding: 10px 12px;
	cursor: pointer;
	border-radius: 4px;
	font-size: 16px;
	border-radius: 10px;
	background: #ffffff;
	box-shadow: 6px 6px 20px #cccccc, -6px -6px 20px #ffffff;
`;

const TodoItemWrapper = styled.section`
	height: 51vh;
	overflow-y: scroll;
	-ms-overflow-style: none; /* IE 및 Edge용 스크롤바 스타일 숨김 */
	scrollbar-width: none; /* Firefox 용 스크롤바 스타일 숨김 */
	&::-webkit-scrollbar {
		display: none; /* Chrome 및 Safari 용 스크롤바 스타일 숨김 */
	}
`;

const TodoItem = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
	margin: 1rem 0rem;
	accent-color: #9de0ad;
	background-color: ${({ isToday }) => (isToday ? "yellowgreen" : "white")};
`;

const TodoText = styled.span`
	flex: 1;
	margin-right: 10px;
	text-decoration: ${({ iscompleted }) =>
		iscompleted ? "line-through" : "none"};
	font-size: 14px;
	font-weight: 700;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const TodoEditButton = styled.button`
	background-color: #76ba3f;
	color: white;
	border: none;
	padding: 4px 8px;
	cursor: pointer;
	border-radius: 30px;
	font-size: 16px;
	margin-right: 4px;
	font-weight: 900;
`;

const TodoCompleteButton = styled.button`
	background-color: #fecb3e;
	color: white;
	border: none;
	padding: 4px 8px;
	cursor: pointer;
	border-radius: 30px;
	font-size: 16px;
	margin-right: 4px;
	font-weight: 900;
`;

const TodoCheckbox = styled.input`
	margin-right: 5px;
`;

const DeleteSelectedButton = styled.button`
	background-color: #ef729e;
	color: white;
	border: none;
	padding: 8px 12px;
	cursor: pointer;
	border-radius: 10px;
	font-size: 16px;
	font-weight: 800;
	margin-left: 14px;

	&:hover {
		background-color: #f03778;
	}
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
				iscompleted: false,
				date: new Date().toISOString().slice(0, 10),
			};
			setTodos([...todos, newTodo]);
			setInputValue("");
		}
	};

	const handleEditTodo = (id, newText) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, text: newText } : todo
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
			todo.id === id ? { ...todo, iscompleted: !todo.iscompleted } : todo
		);
		setTodos(updatedTodos);
	};

	const handleDeleteSelected = () => {
		const updatedTodos = todos.filter((todo) => !todo.isChecked);
		setTodos(updatedTodos);
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			handleAddTodo();
		}
	};

	return (
		<TodoPage>
			<TodoContainer>
				<TodoInput
					type="text"
					placeholder=" Enter a task"
					value={inputValue}
					onChange={handleInputChange}
					onKeyPress={handleKeyPress}
				/>
				<TodoButton onClick={handleAddTodo}> Add </TodoButton>
			</TodoContainer>
			<TodoItemWrapper>
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						data-is-editable={todo.isEditable ? "true" : "false"}
						data-is-today={todo.date === new Date().toISOString().slice(0, 10)}
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
									onKeyPress={handleKeyPress}
								/>

								<TodoButton onClick={() => handleSaveEdit(todo.id)}>
									OK
								</TodoButton>
							</>
						) : (
							<>
								<TodoText iscompleted={todo.iscompleted}>{todo.text}</TodoText>
								{!todo.isEditable && (
									<>
										<TodoEditButton
											onClick={() => handleEditButtonClick(todo.id)}
										>
											E
										</TodoEditButton>
										{!todo.iscompleted && (
											<TodoCompleteButton
												onClick={() => handleCompleteTodo(todo.id)}
											>
												D
											</TodoCompleteButton>
										)}
									</>
								)}
							</>
						)}
					</TodoItem>
				))}
				{todos.some((todo) => todo.isChecked) && (
					<DeleteSelectedButton onClick={handleDeleteSelected}>
						Delete
					</DeleteSelectedButton>
				)}
			</TodoItemWrapper>
		</TodoPage>
	);
}

export default Todo;
