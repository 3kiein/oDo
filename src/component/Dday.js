import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	background-color: #ffffff;
	border-radius: 10px;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
	width: 30vw;
	overflow: hidden;
	border-radius: 20px;
	background: #ffffff;
	box-shadow: inset 6px 6px 20px #cccccc, inset -6px -6px 20px #ffffff;
`;

const DDayForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 24px;
`;

const DatePicker = styled.input`
	padding: 10px;
	border: none;
	border-radius: 5px;
`;

const Button = styled.button`
	font-size: 14px;
	font-weight: 900;
	margin-left: 10px;
	padding: 10px 20px;
	background-color: #2b9b46;
	color: #ffffff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

	&:hover {
		background-color: #16692a;
	}
`;

const Message = styled.p`
	padding: 5px 24px;
	font-size: 16px;
	color: #2b9b46;
	font-weight: 900;

	${({ isFirst }) => isFirst && `padding-top: 20px;`}
`;

const DDayList = styled.ul`
	list-style-type: none;
`;

const ListItem = styled.li`
	margin: 24px;
	font-size: 14px;
	color: ${(props) => (props.$isCompleted ? "#999999" : "#000000")};
	font-weight: ${(props) => (props.$isCompleted ? "normal" : "bold")};
	text-align: right;
`;

const DDayComponent = ({ isPast, title, date }) => {
	const [dDay, setDDay] = useState(null);
	const [dDayList, setDDayList] = useState([]);
	const [isMobileView, setIsMobileView] = useState(false);
	const [daysDifference, setDaysDifference] = useState(null); // 추가: 오늘로부터 D-day까지의 일 수

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const dDayValue = formData.get("dDay");

		if (dDayValue) {
			setDDay(new Date(dDayValue));
		}
	};

	const calculateDaysDifference = (dateA, dateB) => {
		const oneDay = 24 * 60 * 60 * 1000;
		return Math.round(Math.abs((dateA - dateB) / oneDay));
	};

	const getFormattedDate = (date) => {
		const year = String(date.getFullYear()).slice(2);
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}.${month}.${day}`;
	};

	useEffect(() => {
		const savedDDay = localStorage.getItem("dDay");
		if (savedDDay) {
			setDDay(new Date(savedDDay));
		}
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth < 815);
		};

		handleResize(); // Check initial width
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (dDay) {
			const daysDifference = calculateDaysDifference(dDay, new Date()); // 오늘로부터 D-day까지의 일 수 계산
			setDaysDifference(daysDifference);

			const sevenDaysBefore = new Date(dDay);
			sevenDaysBefore.setDate(dDay.getDate() - 7);

			const thirtyDaysBefore = new Date(dDay);
			thirtyDaysBefore.setDate(dDay.getDate() - 30);

			const hundredDaysBefore = new Date(dDay);
			hundredDaysBefore.setDate(dDay.getDate() - 100);

			setDDayList([sevenDaysBefore, thirtyDaysBefore, hundredDaysBefore]);
			localStorage.setItem("dDay", dDay.toISOString());
		}
	}, [dDay]);

	const renderDDateList = () => {
		return dDayList.map((date, index) => {
			const daysDifference = calculateDaysDifference(date, dDay);
			const isPast = date < new Date();
			const isCompleted = daysDifference === 0;
			let label = "";

			if (index === 0) {
				label = "D-7";
			} else if (index === 1) {
				label = "D-30";
			} else if (index === 2) {
				label = "D-100";
			}

			return (
				<ListItem
					key={date}
					$isPast={isPast}
					$isCompleted={isCompleted}
					style={{ textDecoration: isPast ? "line-through" : "none" }}
				>
					{label}: {getFormattedDate(date)}
				</ListItem>
			);
		});
	};

	return (
		<Container>
			{!isMobileView && (
				<DDayForm onSubmit={handleFormSubmit}>
					<DatePicker type="date" name="dDay" required />
					<Button type="submit">Edit D-day</Button>
				</DDayForm>
			)}
			{dDay ? (
				<>
					<Message isFirst>Until</Message>
					<Message>{getFormattedDate(dDay)}</Message>
					{daysDifference !== null && <Message>D - {daysDifference}</Message>}
					<DDayList>{renderDDateList()}</DDayList>
				</>
			) : (
				<Message>D-day 설정이 필요합니다.</Message>
			)}
		</Container>
	);
};

export default DDayComponent;
