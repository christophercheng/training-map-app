import raw_data_sample from './workout-data.json';

const getData = (url) => {
	return new Promise((resolve, reject) => { resolve(raw_data_sample); });
}

export const setInitialLocation = (events) => {
	events.some(event => {
		const values = event.values;
		if (values && values.positionLat && values.positionLong) {
			events[0].values = {
				...values,
				positionLat: values.positionLat,
				positionLong: values.positionLong
			};
			return true;
		}
		return false;
	});
	return events;
};

export const fetchData = (url, preProcessors = []) =>
	getData(url)
		.then(rawData => preProcessors.length ? preProcessors.reduce((acc, processor) => processor(acc), rawData) : rawData )
		.catch(error => []);