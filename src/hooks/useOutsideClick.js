import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
	// select the window and store is as a DOM element
	const ref = useRef();

	// create an effect that closes the Modal Window when we click outside of it
	useEffect(
		function () {
			// a function to close the Modal Window
			function handleClick(e) {
				// if the window is selected
				// if the click element is not in the selected window
				// then close the Modal Window
				if (ref.current && !ref.current.contains(e.target)) handler();
			}

			// the event listener for the click event
			// with out the third argument set to true
			// the eventlistener will listen and perform handleClick in both the bubblling and capturing phase, which causes when we click the button to open the Modal Window nothing will happen.
			// because when the button is click this event listener will also react to it in the bubbling phase, when the click event pass through from the child Modal pass through the parent. This cause the Modal Window to open then close right after, so we only see nothing happening.
			// by setting it to true, the eventlistener will only catch the event in capturing phase and won't be effected by the event coming from the bubbling phase
			document.addEventListener("click", handleClick, listenCapturing);

			// return by remove the event listener
			return () =>
				document.removeEventListener("click", handleClick, listenCapturing);
		},
		[handler, listenCapturing]
	);

	return ref;
}
