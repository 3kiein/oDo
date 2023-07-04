import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #ffffff;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const DDayForm = styled.form`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const DatePicker = styled.input`
	margin-right: 10px;
	padding: 10px;
	border: none;
	border-radius: 5px;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
	margin-left: 10px;
	padding: 10px 20px;
	background-color: #007aff;
	color: #ffffff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

	&:hover {
		background-color: #006ae6;
	}
`;

const Message = styled.p`
	margin-bottom: 20px;
	font-size: 16px;
	color: #007aff;
`;

const DDayList = styled.ul`
	list-style-type: none;
`;

const ListItem = styled.li`
	margin-bottom: 10px;
	font-size: 14px;
	color: ${(props) => (props.isPast ? "#999999" : "#000000")};
	font-weight: ${(props) => (props.isPast ? "normal" : "bold")};
`;

const DDayComponent = () => {
	const [dDay, setDDay] = useState(null);
	const [dDayList, setDDayList] = useState([]);

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
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	useEffect(() => {
		if (dDay) {
			const sevenDaysBefore = new Date(dDay);
			sevenDaysBefore.setDate(dDay.getDate() - 7);

			const thirtyDaysBefore = new Date(dDay);
			thirtyDaysBefore.setDate(dDay.getDate() - 30);

			const hundredDaysBefore = new Date(dDay);
			hundredDaysBefore.setDate(dDay.getDate() - 100);

			setDDayList([sevenDaysBefore, thirtyDaysBefore, hundredDaysBefore]);
		}
	}, [dDay]);

	const renderDDateList = () => {
		return dDayList.map((date) => {
			const daysDifference = calculateDaysDifference(date, dDay);
			const isPast = date < new Date();

			return (
				<ListItem key={date} isPast={isPast}>
					{getFormattedDate(date)} ({isPast ? "과거" : `${daysDifference}일 전`}
					)
				</ListItem>
			);
		});
	};

	return (
		<Container>
			<DDayForm onSubmit={handleFormSubmit}>
				<DatePicker type="date" name="dDay" required />
				<Button type="submit">D-day 설정</Button>
			</DDayForm>
			{dDay ? (
				<>
					<Message>D-day: {getFormattedDate(dDay)}</Message>
					<DDayList>{renderDDateList()}</DDayList>
				</>
			) : (
				<Message>D-day 설정이 필요합니다.</Message>
			)}
		</Container>
	);
};

export default DDayComponent;
