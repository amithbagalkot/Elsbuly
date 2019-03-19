function formatQueryData(data) {
	if (!data) {
		return null
	}
	if (typeof data === 'string') {
		return `'${data}'`
	}

	return data
}

function getDate() {
	var date = new Date();
	var dateFormatted = date.toLocaleString();
	return dateFormatted;
}

function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes

}

module.exports = {
	formatQueryData,
	getDate,
	millisToMinutesAndSeconds
}
