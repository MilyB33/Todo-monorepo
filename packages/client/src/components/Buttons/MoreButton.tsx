import { useNavigate } from "react-router-dom";

const MoreButton = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate("/collections");

  return (
    <button
      onClick={handleClick}
      className="mt-5 mx-auto bg-blue px-4 py-2 rounded transition-colors hover:bg-blue-600 shadow-lg"
    >
      More
    </button>
  );
};

export default MoreButton;
