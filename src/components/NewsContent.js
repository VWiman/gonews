import Link from "next/link";
import { FaUser, FaCalendarAlt, FaExternalLinkSquareAlt } from "react-icons/fa";

const NewsContent = ({ children: article, link }) => {
	return (
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
					<Link href={link} target="_blank">
						link
					</Link>
				</div>
			</div>
			<div>
				<p>{article.description}</p>
			</div>
		</div>
	);
};

export default NewsContent;
