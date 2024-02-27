export default async function fetchNews(apiKey, options) {
	const res = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&${options}`);
	console.log("request:", `https://newsdata.io/api/1/news?apikey=${apiKey}&${options}`);
	const data = await res.json();

	const results = data.results

	const filteredResults = []

	// console.log("Results before filter:", results)

	results.forEach(result => {
		if (filteredResults.some((item) => item.title.toLowerCase() === result.title.toLowerCase())) {
			console.log("skip")
		} else {
			filteredResults.push(result)
		}
	});

	// console.log("Results after filter:", filteredResults);

	return filteredResults || [];
}
