import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleRedirect = () => navigate(-1);

  return (
    <button
      onClick={handleRedirect}
      className="text-2xl hover:scale-110 transition-transform bg-surface-800 p-1 rounded"
    >
      <AiOutlineArrowLeft />
    </button>
  );
};

export default GoBackButton;
