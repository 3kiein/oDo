import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Todo from "./component/Todo";
import Dday from "./component/Dday";
import Tracker from "./component/Tracker";

function App() {
	const storedTodos = localStorage.getItem("todos");
	const initialTodos = storedTodos ? JSON.parse(storedTodos) : [];

	const [todos, setTodos] = useState(initialTodos);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Todo todos={todos} setTodos={setTodos} />} />
				<Route path="/d" element={<Dday />} />
				<Route path="/tracker" element={<Tracker todos={todos} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
