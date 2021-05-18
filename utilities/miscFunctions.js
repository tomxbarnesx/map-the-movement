export function setRandomActive(setterFunction, max) {
	const randomNum = Math.floor(Math.random() * Math.floor(max - 1));
	return setterFunction(randomNum)
}
