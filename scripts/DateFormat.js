/* Format Date to specific pattern */


/* Magic Mirror
 * Module: MMM-Notion
 *
 * By Cedrik Hoffmann
 * MIT Licensed.
 */

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const convertMonth = (date) => ('0' + (date.getMonth() + 1)).slice(-2)
const convertMonthName = (date) => month[date.getMonth()]
const convertDay = (date) => ('0' + (date.getDate())).slice(-2)
const convertDayName = (date) => days[date.getDay()]
const convertHours = (date) => ('0' + (date.getHours())).slice(-2)
const convertMinutes = (date) => ('0' + (date.getMinutes())).slice(-2)
const convertTime = (date) => `${convertHours(date)}:${convertMinutes(date)}`
const dateEqual = (date1, date2) => date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
const isToday = (date) => {
	const today = new Date()
	return dateEqual(date, today)
}
const isTomorrow = (date) => {
	const today = new Date()
	const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
	return dateEqual(date, tomorrow)
}
const isInWeek = (date) => {
	const today = new Date()
	const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
	return nextWeek > date
}
const isExactOneWeek = (date) => {
	const today = new Date()
	const oneWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
	return dateEqual(date, oneWeek)
}

const convertFullDate = (dateString) => {
	const date = new Date(dateString)
	const value = `${convertMonthName(date)} ${convertDay(date)}, ${date.getFullYear()}`
	return dateTimeFormat(dateString, value)
}

const convertMonthDayYear = (dateString) => {
	const date = new Date(dateString)
	const value = `${convertMonth(date)}/${convertDay(date)}/${date.getFullYear()}`
	return dateTimeFormat(dateString, value)
}

const convertDayMonthYear = (dateString) => {
	const date = new Date(dateString)
	const value = `${convertDay(date)}/${convertMonth(date)}/${date.getFullYear()}`
	return dateTimeFormat(dateString, value)
}

const convertYearMonthDay = (dateString) => {
	const date = new Date(dateString)
	const value = `${date.getFullYear()}/${convertMonth(date)}/${convertDay(date)}`
	return dateTimeFormat(dateString, value)
}

const convertRelative = (dateString) => {
	const date = new Date(dateString)
	if (isToday(date)) {
		return dateTimeFormat(dateString, 'Today')
	} else if (isTomorrow(date)) {
		return dateTimeFormat(dateString, 'Tomorrow')
	} else if (isInWeek(date)) {
		return dateTimeFormat(dateString, convertDayName(date))
	} else if (isExactOneWeek(date)) {
		return dateTimeFormat(dateString, `Next ${convertDayName(date)}`)
	} else {
		return convertMonthDayYear(dateString)
	}
}


const dateTimeFormat = (dateString, value) => {
	const date = new Date(dateString)
	return dateString.includes('T') ?
		`${value} ${convertTime(date)}` : value
}
