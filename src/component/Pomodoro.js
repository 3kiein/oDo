import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TimerContainer = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 140px;
	border-radius: 10px 10px 0 0;
	background: #ffffff;
	box-shadow: 6px 6px 20px #cccccc, -6px -6px 20px #ffffff;
	gap: 20px;
`;

const TimerContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-grow: 1;
	position: relative;
`;

const Timing = styled.div`
	font-size: 50px;
	margin-top: 10px;
	position: absolute;
	left: 40px;
`;

const Buttons = styled.section`
	display: flex;
	flex-direction: column;
    position: absolute;
    right: 40px;
`;

const Button = styled.button`
	margin-top: 10px;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	background: #ffffff;
	box-shadow: 3px 3px 10px #cccccc, -3px -3px 10px #ffffff;
	cursor: pointer;
	font-weight: bold;
`;

const RecentRecord = styled.div`
	position: absolute;
	top: 16px;
	right: 40px;
	font-size: 10px;
    font-weight: 700;
`;

const Timer = () => {
	const [time, setTime] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [recentRecord, setRecentRecord] = useState(null);

	useEffect(() => {
		let interval = null;

		if (isActive) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 1);
			}, 1000);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isActive]);

	const handleToggle = () => {
		setIsActive(!isActive);
	};

	const handleReset = () => {
		setRecentRecord(formatTime(time));
		setTime(0);
		setIsActive(false);
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
			2,
			"0"
		)}`;
	};

	return (
		<TimerContainer>
			<TimerContent>
				<Timing>{formatTime(time)}</Timing>
			</TimerContent>
			<Buttons>
				<Button onClick={handleToggle}>{isActive ? "Stop" : "Start"}</Button>
				<Button onClick={handleReset}>Reset</Button>
			</Buttons>
			{recentRecord && <RecentRecord>Recent: {recentRecord}</RecentRecord>}
		</TimerContainer>
	);
};

export default Timer;
