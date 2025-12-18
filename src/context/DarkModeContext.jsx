import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
	// this is the only global state that we need to manage ourselves
	// all the other states are being handle by React Query
	// this is the only local global state so we need to create a context for it
	const [isDarkMode, setIsDarkMode] =
		// instead of useState that we always use, we can use this custom hook we created ourselves
		// this just set the state then synchronizes it with LocalStorage
		useLocalStorageState(false, "isDarkMode");

	useEffect(
		function () {
			if (isDarkMode) {
				document.documentElement.classList.add("dark-mode");
				document.documentElement.classList.remove("light-mode");
			} else {
				document.documentElement.classList.remove("dark-mode");
				document.documentElement.classList.add("light-mode");
			}
		},
		[isDarkMode]
	);

	function toggleDarkMode() {
		setIsDarkMode(isDark => !isDark);
	}

	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

function useDarkMode() {
	const context = useContext(DarkModeContext);
	if (context === undefined)
		throw new Error("DarkModeContext was used outside of DarkModeProvider");

	return context;
}

export { DarkModeProvider, useDarkMode };
