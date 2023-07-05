import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./component/Header";
import Todo from "./component/Todo";
import Dday from "./component/Dday";
import Tracker from "./component/Tracker";
import Pomodoro from "./component/Pomodoro";

const Container = styled.div`
	display: flex;
	min-height: 88vh;
`;

const Aside = styled.aside`
	flex: 1;
	flex-basis: 33%;
	max-width: 33%;
	margin: 20px;
	height: 60vh;
`;

const Content = styled.div`
	flex: 2;
	flex-basis: 66%;
	max-width: 66%;
`;

const DdayContainer = styled.div`
	margin-bottom: 20px;
`;

function App() {
	const storedTodos = localStorage.getItem("todos");
	const initialTodos = storedTodos ? JSON.parse(storedTodos) : [];

	const [todos, setTodos] = useState(initialTodos);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<>
			<Header />
			<Container>
				<Aside>
					<DdayContainer>
						<Dday />
					</DdayContainer>
					<Tracker todos={todos} />
				</Aside>
				<Content>
					<Todo todos={todos} setTodos={setTodos} />
				</Content>
				<Pomodoro />
			</Container>
		</>
	);
}

export default App;
