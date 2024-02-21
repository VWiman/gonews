import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleBookmark } from "../store/bookmarkSlice";

const Home = () => {
  const [news, setNews] = useState([]);
  const bookmarks = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("./api/articles.json");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleBookmarkToggle = (article) => {
    dispatch(toggleBookmark(article));
  };

  return (
    <div>
      <h1>Huvudnyheter</h1>
      <ul>
        {news.map((article) => (
          <li key={article.article_id}>
            {article.title}
            <button onClick={() => handleBookmarkToggle(article)}>
              {bookmarks.some(
                (bookmark) => bookmark.article_id === article.article_id
              )
                ? "Ta bort bokmärke"
                : "Lägg till bokmärke"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
