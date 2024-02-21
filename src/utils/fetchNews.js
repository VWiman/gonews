export default async function fetchNews(apiKey, options) {
	const res = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&q=${options}`);
	console.log("request:", `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${options}`);
	const data = await res.json();

	return data.results || [];
}
