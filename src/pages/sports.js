import React from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchNews from "@/utils/fetchNews";
import Link from "next/link";
import { toggleBookmark } from "@/store/bookmarkSlice";

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
  const filteredNews = news.filter((item) => item.category.includes("sports"));
  // rendera nyhetsartiklarna
  return (
    <div>
      {" "}
      <div className=" bg-blue-200">
        <p>Temp navbar</p>
        <Link href="/bookmarks">Bokmärken</Link>
        <hr />
        <Link href="/">Home</Link>
        <hr />
        <Link href="/world">World</Link>
      </div>
      <h1>Huvudnyheter</h1>
      <ul>
        {filteredNews.map((article) => (
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
            <Link href={`/${article.category}article/${article.article_id}`}>
              Läs mer
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// funktion för att hämta nyhetsdata vid build.
export async function getStaticProps() {
  const apiKey = process.env.API_KEY;
  const options = `category=sports&size=10&language=en`;

  try {
    const news = await fetchNews(apiKey, options);

    return {
      props: { news },
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      props: { news: [] },
    };
  }
}

export default Home;
