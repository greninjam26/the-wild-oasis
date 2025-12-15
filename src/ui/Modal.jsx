import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

// 1. create the context
const ModalContext = createContext();

// 2. create the parent component
function Modal({ children }) {
	// a state that controls which modal window is open or not
	const [openName, setOpenName] = useState("");

	const close = () => setOpenName("");
	const open = setOpenName;

	return (
		<ModalContext.Provider value={{ openName, close, open }}>
			{children}
		</ModalContext.Provider>
	);
}

// 3. create child components to help to complete this task
function Open({ children, opens: opensWindownName }) {
	const { open } = useContext(ModalContext);

	// closeElement: don't use it too much.
	// this will create a new component base on the one passed in so we can add new props and things
	return cloneElement(children, { onClick: () => open(opensWindownName) });
}

function Window({ children, name }) {
	const { openName, close } = useContext(ModalContext);
	const ref = useOutsideClick(close);

	if (name !== openName) return null;

	// createPortal take two arguments
	// 1. the JSX we want to render
	// 2. a dom Node, which is where we want to render this JSX
	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={close}>
					<HiXMark />
				</Button>
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		// some people say it is not ideal, but it works
		document.body
	);
}

// 4. add the child components as properties to the parent component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
