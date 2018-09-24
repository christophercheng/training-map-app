export const calculateAveragePower = (workoutData) => {
	const totalPower = workoutData.reduce((acc, curr) => acc + (curr.values.power ? curr.values.power : 0), 0 );
	const totalEvents = workoutData.length - 1;
	return Math.floor((totalPower / totalEvents) * 100) / 100;
}

export const getRangeHash = ([startIndex, endIndex]) => `${startIndex}-${endIndex}`;

export const formatDisplayTime = (offsetSeconds) => {
	const minutes = Math.floor(offsetSeconds / 60);
	const seconds = offsetSeconds - minutes * 60;
	return `${minutes} minutes ${seconds} seconds`;
}
