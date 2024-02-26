import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark } from "@/store/bookmarkSlice";
import NewsContent from "@/components/NewsContent";

import { FaSortDown, FaSortUp, FaStar, FaRegStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
const AccordionItem = ({ article }) => {
  const [openAccor, setOpenAccor] = useState(false);
  const bookmarks = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();
  const defaultImg = "/images/default.jpeg";

  const handleBookmarkToggle = (article) => {
    dispatch(toggleBookmark(article));
  };

  return (
    <div className="gonews">
      <li
        key={article.article_id}
        className=" hover:bg-slate-100 p-2 rounded-lg"
      >
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setOpenAccor(!openAccor)}
        >
          <div>
            <h2 className="text-2xl m-0">{article.title}</h2>
          </div>
          <div className=" cursor-pointer">
            {!openAccor ? (
              <FaSortDown className="h-5 text-black w-5 hover:cursor-pointer  " />
            ) : (
              <FaSortUp className="h-5 text-black w-5 hover:cursor-pointer mt-1" />
            )}
          </div>
        </div>

        <div className={openAccor ? " newsblock " : " hidden"}>
          <div className="newsimg">
            <img
              src={article.image_url || defaultImg}
              alt={article.title}
              width={200}
            />
          </div>
          <div className="newsart">
            <NewsContent link={article.link}>{article}</NewsContent>
          </div>
        </div>

        <div className="newslinks">
          <button onClick={() => handleBookmarkToggle(article)}>
            {bookmarks.list.some(
              (bookmark) => bookmark.article_id === article.article_id
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
      </li>
    </div>
  );
};

export default AccordionItem;
