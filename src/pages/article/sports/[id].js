import fetchNews from "@/utils/fetchNews";
import Link from "next/link";
import { FaUser, FaCalendarAlt, FaExternalLinkSquareAlt } from "react-icons/fa";

export async function getStaticPaths() {
  const apiKey = process.env.API_KEY;
  const options = `category=sports&size=10&language=en`;

  const articles = await fetchNews(apiKey, options);

  const paths = articles.map((article) => ({
    params: { id: article.article_id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const apiKey = process.env.API_KEY;
  const options = `category=sports&size=10&language=en`;
  const articles = await fetchNews(apiKey, options);

  const article = articles.find((article) => article.article_id == params.id);

  return {
    props: {
      article,
    },
  };
}

export default function Article({ article }) {
  return (
    <div className="single">
      {article && (
        <>
          <div>
            <h1>{article.title}</h1>
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
          <div className="bg-slate-200 mt-5 mb-5">
            <img
              className="singleimg object-cover max-h-[380px] w-[100%] object-center"
              src={article.image_url}
            />
          </div>
          <p className="test text-lg font-semibold">{article.description}</p>
          <div className="fakecontent">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus
              non enim praesent elementum facilisis leo vel fringilla est. Sed
              odio morbi quis commodo. Morbi tincidunt augue interdum velit
              euismod in.
            </p>
            <p>
              Ullamcorper a lacus vestibulum sed arcu non odio. Fermentum
              posuere urna nec tincidunt praesent semper. Fringilla ut morbi
              tincidunt augue. Justo eget magna fermentum iaculis eu non. Nisl
              condimentum id venenatis a condimentum vitae sapien pellentesque
              habitant. Egestas integer eget aliquet nibh praesent tristique
              magna sit amet. Rhoncus urna neque viverra justo nec ultrices dui
              sapien. Ac turpis egestas sed tempus urna. Fringilla urna
              porttitor rhoncus dolor purus non enim. Sed pulvinar proin gravida
              hendrerit. Eget nulla facilisi etiam dignissim. Viverra vitae
              congue eu consequat. Nisi quis eleifend quam adipiscing vitae
              proin sagittis nisl. Sagittis eu volutpat odio facilisis mauris.
              Pellentesque diam volutpat commodo sed egestas egestas fringilla
              phasellus faucibus. Fermentum odio eu feugiat pretium nibh ipsum
              consequat. Ligula ullamcorper malesuada proin libero nunc
              consequat interdum.
            </p>
            <p>
              Egestas integer eget aliquet nibh praesent tristique. Viverra
              aliquet eget sit amet tellus cras. Senectus et netus et malesuada
              fames ac turpis egestas integer. Enim eu turpis egestas pretium
              aenean pharetra magna ac. Sapien eget mi proin sed. Cursus sit
              amet dictum sit amet justo. Tellus integer feugiat scelerisque
              varius. Pharetra convallis posuere morbi leo. Amet facilisis magna
              etiam tempor orci eu lobortis elementum.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
