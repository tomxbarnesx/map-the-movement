import { useState, useEffect } from 'react';
import throttle from "lodash/throttle"

const windowCatch = () => {
	if (typeof window !== "undefined") {
		if (window.top === window) {
			return true;
		} else {
			return false;
		}
	} 
	return true;
}

function useWindowSize() {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			// Handler to call on window resize
			function handleResize() {
				// Set window width/height to state
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			}
			// Add event listener
			window.addEventListener("resize", handleResize);
			// Call handler right away so state gets updated with initial window size
			handleResize();

			return () => window.removeEventListener("resize", handleResize);
		}
	}, []); // Empty array ensures that effect is only run on mount

	return windowSize;
}

function useVhResize() {
	useEffect(() => {
		if (typeof window !== "undefined") {
			const handleResize = throttle(() => {
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', `${vh}px`);
			}, 700)

			window.addEventListener("resize", handleResize);
			
			handleResize();

			return () => {
				document.documentElement.style.removeProperty('--vh');
				window.removeEventListener("resize", handleResize);
			}
		}
	}, [])
}

export { windowCatch, useWindowSize, useVhResize };