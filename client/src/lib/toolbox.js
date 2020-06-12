export const toDashCase = (string) =>
	string
		.split(/(?=[A-Z])/)
		.join('-')
		.toLowerCase()

export const capitalize = (string) =>
	string.charAt(0).toUpperCase() + string.slice(1)

export const array = (number) => [...Array(number).keys()]

export const generate = (data, mapper) => Object.assign(...data.map(mapper))

export const clean = (string) => string.split(':')[0]

export const key = (e) => ({
	enter: e.keyCode === 13,
	backspace: e.keyCode === 8 && e.ctrlKey,
	esc: e.keyCode === 27,
})
