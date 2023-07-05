import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TrackerPage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 3rem 0rem;
	width: 30vw;
	border-radius: 20px;
	background: #ffffff;
	box-shadow: inset 6px 6px 20px #cccccc, inset -6px -6px 20px #ffffff;

	.trackerTitle {
		font-weight: 900;
		font-size: 18px;
		color: #16692a;
		padding: 1rem;
	}
`;

const Calendar = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const Day = styled.div`
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	background-color: ${({ color }) => color};
	color: ${({ textColor }) => textColor};
`;

function Tracker({ todos }) {
	const [isMobileView, setIsMobileView] = useState(false);
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth < 850);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const handleDateChange = () => {
			setCurrentDate(new Date());
		};

		const interval = setInterval(handleDateChange, 1000 * 60);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const getDateKey = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year}-${month}-${day}`;
	};

	const countCompletedTodos = (date) => {
		const dateKey = getDateKey(date);
		return todos.filter((todo) => {
			const todoDateKey = getDateKey(new Date(todo.date));
			return todoDateKey === dateKey && todo.iscompleted;
		}).length;
	};

	const renderCalendar = () => {
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth();
		const startDate = new Date(currentYear, currentMonth, 1);
		const endDate = new Date(currentYear, currentMonth + 1, 0);
		const calendar = [];

		let date = new Date(startDate);

		if (isMobileView) {
			date.setDate(currentDate.getDate() - 3);
		}

		while (date <= endDate) {
			const completedCount = countCompletedTodos(date);
			let backgroundColor = "";
			let textColor = "";

			if (completedCount >= 6) {
				backgroundColor = "#2B9B46";
				textColor = "white";
			} else if (completedCount >= 3) {
				backgroundColor = "#9DE0AD";
				textColor = "white";
			} else if (completedCount === 1) {
				backgroundColor = "#DEF5BB";
			}

			calendar.push(
				<Day
					key={date.toISOString()}
					color={backgroundColor}
					textColor={textColor}
				>
					{date.getDate()}
				</Day>
			);

			date.setDate(date.getDate() + 1);

			if (isMobileView && calendar.length === 7) {
				break;
			}
		}

		return calendar;
	};

	return (
		<TrackerPage>
			<h2 className="trackerTitle">Tracker</h2>
			<Calendar>{renderCalendar()}</Calendar>
		</TrackerPage>
	);
}

export default Tracker;
