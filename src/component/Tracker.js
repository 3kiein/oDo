import React from "react";
import styled from "styled-components";

const Calendar = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-gap: 5px;
`;

const Day = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	background-color: ${({ color }) => color};
`;

function Tracker({ todos }) {
	const getDateKey = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		return `${year}-${month}-${day}`;
	};

	const countCompletedTodos = (date) => {
		const dateKey = getDateKey(date);
		return todos.filter((todo) => {
			const todoDateKey = getDateKey(new Date(todo.date));
			return todoDateKey === dateKey && todo.isCompleted;
		}).length;
	};

	const renderCalendar = () => {
		const currentDate = new Date();
		const startDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			1
		);
		const endDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() + 1,
			0
		);
		const calendar = [];

		let date = new Date(startDate);
		while (date <= endDate) {
			const completedCount = countCompletedTodos(date);
			let color = "";
			if (completedCount >= 6) {
				color = "green";
			} else if (completedCount >= 3) {
				color = "yellowgreen";
			} else if (completedCount === 1) {
				color = "lightgreen";
			}

			calendar.push(
				<Day key={date.toISOString()} color={color}>
					{date.getDate()}
				</Day>
			);

			date.setDate(date.getDate() + 1);
		}

		return calendar;
	};

	return (
		<div>
			<h2>Todo Tracker</h2>
			<Calendar>{renderCalendar()}</Calendar>
		</div>
	);
}

export default Tracker;
