import { toggleBookmark } from "@/store/bookmarkSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";



const Bookmarks = () => {
    const bookmarks = useSelector((state) => state.bookmarks);
    
	const dispatch = useDispatch();

	const handleBookmarkToggle = (article) => {
		dispatch(toggleBookmark(article));
	};
	
	function displayLink(article, category) {
		const cat = category.toString()
		if (cat === "sports") {
			return <Link href={`/sportsarticle/${article.article_id}`}>Läs mer</Link>;
		} else if (cat === "world") {
			return <Link href={`/worldarticle/${article.article_id}`}>Läs mer</Link>;
		} else {
			return <Link href={`/article/${article.article_id}`}>Läs mer</Link>;
		}
	}
    
	return (
		<div>
			<div className=" bg-blue-200">
				<p>Temp navbar</p>
				<Link href="/">Home</Link>
				<hr />
				<Link href="/sports">Sports</Link>
				<hr />
				<Link href="/world">World</Link>
			</div>
			<h2>Bookmarks</h2>

			<ul>
				{bookmarks.list.map((article) => (
					<li key={article.article_id}>
						<h2 className="text-2xl">{article.title}</h2>
						<p className="text-lg">{article.description}</p>
						<button onClick={() => handleBookmarkToggle(article)}>
							{bookmarks.list.some((bookmark) => bookmark.article_id === article.article_id)
								? "Ta bort bokmärke"
								: "Lägg till bokmärke"}
						</button>
						{displayLink(article, article.category)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Bookmarks