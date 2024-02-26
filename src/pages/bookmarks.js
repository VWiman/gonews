import AccordionItem from "@/components/AccordionItem";
import { useSelector } from "react-redux";

const Bookmarks = () => {
  const bookmarks = useSelector((state) => state.bookmarks);

  return (
    <div>
      <h2>Bookmarks</h2>
      <ul className=" space-y-4">
        {/* // Add accordian and show description and image on click article.description och article.image_url  */}
        {bookmarks.list.map((article, index) => (
          <AccordionItem key={index + article.article_id} article={article} />
        ))}
      </ul>
    </div>
  );
};

export default Bookmarks;
