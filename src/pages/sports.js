import React from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchNews from "@/utils/fetchNews";
import Link from "next/link";
import DefaultImg from "/public/images/default.jpeg";
import { toggleBookmark } from "@/store/bookmarkSlice";
import {
  FaUser,
  FaCalendarAlt,
  FaExternalLinkSquareAlt,
  FaAngleDoubleRight,
  FaStar,
  FaRegStar,
} from "react-icons/fa";

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
        <h1>Sports News</h1>
        <div className="gonews">
          {filteredNews.map((article) => (
              <div key={article.article_id} className="newsblock">
                <div className="newsimg">
                  <img
                    src={article.image_url || { DefaultImg }}
                    alt={article.title}
                    width={200}
                  />
                </div>
                <div className="newsart">
                  <div className="newscontent">
                    <div>
                      <h2>{article.title}</h2>
                    </div>
                    <div className="newsinfo">
                      <div className="item">
                        <FaUser />
                        {article.creator}
                      </div>
                      <div className="item">
                        <FaCalendarAlt /> {article.pubDate}
                      </div>
                      <div className="item">
                        <FaExternalLinkSquareAlt />
                        <Link href={article.link} target="_blank">
                          link
                        </Link>
                      </div>
                    </div>
                    <div>
                      <p>{article.description}</p>
                    </div>
                  </div>
                  <div className="newslinks">
                    <div>
                      {/* Added some function for adding class in button when is added */}
                      <button
                        onClick={() => handleBookmarkToggle(article)}
                        className={`button ${
                          bookmarks.list.some(
                            (bookmark) =>
                              bookmark.article_id === article.article_id
                          )
                            ? "added"
                            : ""
                        }`}
                      >
                        {bookmarks.list.some(
                          (bookmark) =>
                            bookmark.article_id === article.article_id
                        ) ? (
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
                      <Link
                        href={`/${article.category}article/${article.article_id}`}
                      >
                        Read more <FaAngleDoubleRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
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
