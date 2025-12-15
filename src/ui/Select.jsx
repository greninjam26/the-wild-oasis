import styled from "styled-components";

const StyledSelect = styled.select`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid
		${props =>
			props.type === "white" ? "var(--color-grey-100)" : "var(--color-grey-300)"};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`;

function Select({ options, ...props }) {
	return (
		// this way by spreading the props with ...
		// this way we don't need to pass in value and type and onChange seperatly
		// we can pass down all the props in one go
		<StyledSelect {...props}>
			{options.map(option => (
				<option value={option.value} key={option.value}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	);
}

export default Select;
