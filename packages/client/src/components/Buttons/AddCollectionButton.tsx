import { AiOutlinePlus } from "react-icons/ai";

interface PropTypes {
  onClick: () => void;
}

const AddCollectionButton = ({ onClick }: PropTypes) => {
  return (
    <button
      onClick={onClick}
      className="h-min py-5 flex justify-center border-text-secondary border-2 border-dashed transition-all hover:scale-105"
    >
      <AiOutlinePlus />
    </button>
  );
};

export default AddCollectionButton;
