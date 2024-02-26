import React from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchNews from "@/utils/fetchNews";
import Link from "next/link";
import { toggleBookmark } from "@/store/bookmarkSlice";
import { FaAngleDoubleRight, FaStar, FaRegStar } from "react-icons/fa";
import NewsContent from "@/components/NewsContent";

// definiera en funktionell komponent Home, som tar emot nyhetsdata som en prop
const Home = ({ news, topsport, topent }) => {
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
      <div className="maincontent">
        <div className="mainleft">
          <h1>Latest News</h1>
          <div className="gonews">
            {news.map((article) => (
              <div key={article.article_id} className="newsblock">
                <div className="newsimg">
                  <img
                    src={article.image_url || defaultImg}
                    alt={article.title}
                    width={200}
                  />
                </div>
                <div className="newsart">
                  <NewsContent link={article.link}>{article}</NewsContent>
                  <div className="newslinks">
                    <div>
                      {/* Added some() function for adding class in button when is added */}
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

        <div className="mainright">
          <div className="rightnewsblock">
            <h3>Sport News</h3>
            {topsport.map((article) => (
              <ul key={article.article_id}>
                <li>
                  <Link href={`/article/sports/${article.article_id}`}>
                    {article.title}
                  </Link>
                </li>
              </ul>
            ))}
            <Link href="/sports" className="catlink">
              Sport news <FaAngleDoubleRight />
            </Link>
          </div>
          <div className="rightnewsblock">
            <h3>Entertainment News</h3>
            {topent.map((article) => (
              <ul key={article.article_id}>
                <li>
                  <Link href={`/article/entertainment/${article.article_id}`}>
                    {article.title}
                  </Link>
                </li>
              </ul>
            ))}
            <Link href="/entertainment" className="catlink">
              Entertainment news <FaAngleDoubleRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

// funktion för att hämta nyhetsdata vid build.
export async function getStaticProps() {
  const apiKey = process.env.API_KEY;
  const options = `size=5&language=en`;
  const topSportOptions = `category=sports&size=5&language=en`;
  const topsEntOptions = `category=entertainment&size=5&language=en`;

  try {
    const news = await fetchNews(apiKey, options);
    const topsport = await fetchNews(apiKey, topSportOptions);
    const topent = await fetchNews(apiKey, topsEntOptions);
    console.log("Fetch was successful.");
    return {
      props: { news, topsport, topent },
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      props: { news: [] },
    };
  }
}

export default Home;
