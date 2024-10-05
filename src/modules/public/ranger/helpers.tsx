export const generateSocketURI = (baseUrl: string, s: string[]) => `${baseUrl}/?stream=${s.sort().join('&stream=')}`;

export const streamsBuilder = (withAuth: boolean, prevSubscriptions: string[] ) => {
	let streams: string[] = ['global.tickers'];

	if (withAuth) {
		streams = [...streams, 'order', 'trade', 'deposit_address'];
 
	}
	 
	for (const stream of prevSubscriptions) {
		if (streams.indexOf(stream) < 0) {
			streams.push(stream);
		}
	}

	return streams;
};