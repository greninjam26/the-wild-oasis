import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

// it is a react component so it need to start with an upper case
// because this is for this component the ame is different from the html element
const StyledApp = styled.div`
	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Row>
					<Row type="horizontal">
						<Heading as="h1">The Wild Oasis</Heading>
						<div>
							<Heading as="h2">Check in and out</Heading>
							<Button>Check in</Button>
							<Button variations="secondary" sizes="small">
								Check out
							</Button>
						</div>
					</Row>

					<Row>
						<Heading as="h3">Form</Heading>
						<form>
							<Input type="number" placeholder="Number of Guests" />
							<Input type="number" placeholder="Number of Guests" />
						</form>
					</Row>
				</Row>
			</StyledApp>
		</>
	);
}

export default App;
