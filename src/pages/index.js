import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleBookmark } from "../store/bookmarkSlice";

const Home = ({ news }) => {
  const bookmarks = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();

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

export const getServerSideProps = async () => {
  try {
    const response = await fetch("https://api.example.com/news");
    const news = await response.json();

    return {
      props: { news },
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      props: { news: [] },
    };
  }
};

export default Home;
