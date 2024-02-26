import React from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchNews from "@/utils/fetchNews";
import Link from "next/link";
import { toggleBookmark } from "@/store/bookmarkSlice";
import { FaAngleDoubleRight, FaStar, FaRegStar } from "react-icons/fa";
import NewsContent from "@/components/NewsContent";

// definiera en funktionell komponent Home, som tar emot nyhetsdata som en prop
const Home = ({ news, topnews }) => {
	const defaultImg = "/images/default.jpeg";
	//hämta bokmärken från Redux-store och lagra dem i variabeln bookmarks
	const bookmarks = useSelector((state) => state.bookmarks);

	// hook för att få en actionfunktion från Redux och lagra den i variabeln dispatch
	const dispatch = useDispatch();

	// hantera klickhändelsen för att lägga till eller ta bort ett bokmärke.
	const handleBookmarkToggle = (article) => {
		dispatch(toggleBookmark(article));
	};

	// rendera nyhetsartiklarna
	return (
		<>
			<div>
				{/* Top News test start */}
				<h2>Top News</h2>
				{topnews.map((article) => (
					<div key={article.article_id} className="newsblock">
						{article.title}
					</div>
				))}

				{/* Top News test End */}

				<h1>Latest News</h1>
				<div className="gonews">
					{news.map((article) => (
						<div key={article.article_id} className="newsblock">
							<div className="newsimg">
								<img src={article.image_url || defaultImg} alt={article.title} width={200} />
							</div>
							<div className="newsart">
								<NewsContent link={article.link}>{article}</NewsContent>
								<div className="newslinks">
									<div>
										{/* Added some() function for adding class in button when is added */}
										<button
											onClick={() => handleBookmarkToggle(article)}
											className={`button ${
												bookmarks.list.some((bookmark) => bookmark.article_id === article.article_id) ? "added" : ""
											}`}>
											{bookmarks.list.some((bookmark) => bookmark.article_id === article.article_id) ? (
												<>
													<FaStar /> Remove bookmark
												</>
											) : (
												<>
													<FaRegStar /> Add bookmark
												</>
											)}
										</button>
									</div>
									<div>
										<Link href={`/article/${article.article_id}`}>
											Read more <FaAngleDoubleRight />
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

// funktion för att hämta nyhetsdata vid build.
export async function getStaticProps() {
	const apiKey = process.env.API_KEY;
	const options = `size=5&language=en`;
	const topOptions = `category=sports&size=3&language=en`;

	try {
		const news = await fetchNews(apiKey, options);
		const topnews = await fetchNews(apiKey, topOptions);
		console.log("Fetch was successful.");
		return {
			props: { news, topnews },
		};
	} catch (error) {
		console.error("Error fetching news:", error);
		return {
			props: { news: [] },
		};
	}
}

export default Home;
