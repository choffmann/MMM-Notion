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
	const now = new Date();
	const oneDayMs = 24 * 60 * 60 * 1000;
	const diffMs = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
	const diffDays = Math.floor(diffMs / oneDayMs);
	const dayOfWeek = date.toLocaleDateString('en-US', {weekday: 'long'});

	if (diffDays === 0) {
		return dateTimeFormat(dateString, 'Today');
	} else if (diffDays === -1) {
		return dateTimeFormat(dateString, 'Yesterday');
	} else if (diffDays === 1) {
		return dateTimeFormat(dateString, 'Tomorrow');
	} else if (diffDays > 1 && diffDays <= 7) {
		return dateTimeFormat(dateString, `Next ${dayOfWeek}`);
	} else if (diffDays < -1 && diffDays >= -7) {
		return dateTimeFormat(dateString, `Last ${dayOfWeek}`);
	} else {
		return convertFullDate(dateString)
	}
}


const dateTimeFormat = (dateString, value) => {
	const date = new Date(dateString)
	return dateString.includes('T') ?
		`${value} ${convertTime(date)}` : value
}
