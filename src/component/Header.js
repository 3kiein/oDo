import styled from "styled-components";

const StyledHeader = styled.header`
	display: flex;
	justify-content: center;

	img {
		width: 30vw;
		padding: 1rem;
	}
`;

export default function Header() {
	return (
		<StyledHeader>
			<img src="/logo.png" alt="logo" />
		</StyledHeader>
	);
}
