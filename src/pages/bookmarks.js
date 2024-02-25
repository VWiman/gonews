import AccordionItem from "@/components/AccordionItem";
import Link from "next/link";

import { useSelector } from "react-redux";

const Bookmarks = () => {
  const bookmarks = useSelector((state) => state.bookmarks);

  return (
    <div>
      <div className=" bg-blue-200">
        <p>Temp navbar</p>
        <Link href="/">Home</Link>
        <hr />
        <Link href="/sports">Sports</Link>
        <hr />
        <Link href="/entertainment">Entertainment</Link>
      </div>
      <h2>Bookmarks</h2>

      <ul className=" space-y-4">
        {/* // Add accordian and show description and image on click article.description och article.image_url  */}
        {bookmarks.list.map((article) => (
          <AccordionItem article={article} />
        ))}
      </ul>
    </div>
  );
};

export default Bookmarks;
