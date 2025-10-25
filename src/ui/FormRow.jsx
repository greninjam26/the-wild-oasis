import styled from "styled-components";

const StyledFormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

// display the properly formated input boxes with text and error handling
function FormRow({ label, error, children }) {
	return (
		<StyledFormRow>
			{/* check if there is a label */}
			{label && <Label htmlFor={children.props.id}>{label}</Label>}
			{children}
			{/* check if this field have an error, if it does display the message */}
			{error && <Error>{error}</Error>}
		</StyledFormRow>
	);
}

export default FormRow;
