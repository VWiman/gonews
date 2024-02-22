import fetchNews from "@/utils/fetchNews";
import Link from "next/link";

export async function getStaticPaths() {
	const apiKey = process.env.API_KEY;
	const options = `category=world&size=10&language=en`;

	const articles = await fetchNews(apiKey, options);

	const paths = articles.map((article) => ({
		params: { id: article.article_id },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const apiKey = process.env.API_KEY;
	const options = `category=world&size=10&language=en`;
	const articles = await fetchNews(apiKey, options);

	const article = articles.find((article) => article.article_id == params.id);

	return {
		props: {
			article,
		},
	};
}

export default function Article({ article }) {
	return (
		<div>
			<div className=" bg-blue-200">
				<p>Temp navbar</p>
				<Link href="/bookmarks">Bokmärken</Link>
				<hr />
				<Link href="/">Home</Link>
				<hr />
				<Link href="/sports">Sports</Link>
				<hr />
				<Link href="/world">World</Link>
			</div>
			{article && (
				<>
					<img src={article.image_url} />
					<h2>{article.title}</h2>
					<p>{article.description}</p>
				</>
			)}
		</div>
	);
}
