import { styled } from "styled-components";

export default function Header() {
	const Header = styled.header`
		display: flex;
		justify-content: center;

		img {
			width: 30vw;
			padding: 2rem;
		}
	`;
	return (
		<Header>
			<img src="/logo.png" alt="logo" />
		</Header>
	);
}
