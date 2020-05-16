export const toDashCase = (string) =>
	string
		.split(/(?=[A-Z])/)
		.join('-')
		.toLowerCase()

export const capitalize = (string) =>
	string.charAt(0).toUpperCase() + string.slice(1)

export const array = (number) => [...Array(number).keys()]

export const generate = (data, mapper) => Object.assign(...data.map(mapper))
