import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button type="button" onClick={handleClick} className="backbutton">
      <FaArrowLeft /> Go back
    </button>
  );
};

export default BackButton;
