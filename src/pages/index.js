import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleBookmark } from "../store/bookmarkSlice";
import fetchNews from "@/utils/fetchNews";

// definiera en funktionell komponent Home, som tar emot nyhetsdata som en prop
const Home = ({ news }) => {
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
    <div>
      <h1>Huvudnyheter</h1>
      <ul>
        {news.map((article) => (
          <li key={article.article_id}>
            <h2 className="text-2xl">{article.title}</h2>
            <p className="text-lg">{article.description}</p>
            <button onClick={() => handleBookmarkToggle(article)}>
              {bookmarks.list.some(
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

// funktion för att hämta nyhetsdata vid build samt var 10 min.
export async function getStaticProps() {
  const apiKey = process.env.API_KEY;
  const options = `size=10&language=en`;
  try {
    const news = await fetchNews(apiKey, options);
    const refreshTime = 60 * 10;
    return {
      props: { news },
      revalidate: refreshTime,
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      props: { news: [] },
    };
  }
}

export default Home;
