import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark } from "@/store/bookmarkSlice";

import {
  FaArrowAltCircleDown,
  FaSortAlphaUp,
  FaSortDown,
  FaSortUp,
  FaUps,
} from "react-icons/fa";
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
    <li key={article.article_id} className=" hover:bg-slate-100 p-2 rounded-lg">
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

      <div
        className={openAccor ? " flex flex-col md:flex-row py-4" : " hidden"}
      >
        <div className="max-h-[150px] max-w-[200px] ">
          <img
            className=" h-full w-full object-contain object-top"
            src={article.image_url || defaultImg}
            alt={article.title}
            width={1000}
          />
        </div>
        <div className=" px-5 ">{article.description}</div>
      </div>

      <button onClick={() => handleBookmarkToggle(article)}>
        {bookmarks.list.some(
          (bookmark) => bookmark.article_id === article.article_id
        ) ? (
          <div className=" flex items-center space-x-2 py-3 group ">
            <IoMdClose className=" bg-red-500 rounded-full h-5 p-1 w-5 group-hover:opacity-75 " />
            <p className=" group-hover:opacity-75 flex p-0  ">
              Ta bort bokmärke
            </p>
          </div>
        ) : (
          "Lägg till bokmärke"
        )}
      </button>
    </li>
  );
};

export default AccordionItem;
