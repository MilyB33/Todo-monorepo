import { FiChevronDown } from "react-icons/fi";

interface PropTypes {
  text: string;
  isOpen: boolean;
  onClick: () => void;
}
const EditButton = ({ text, isOpen, onClick }: PropTypes) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between bg-surface-700 hover:bg-surface-900 transition-colors px-2 py-1 rounded"
    >
      {text}
      <span className={`${isOpen ? "rotate-180" : "rotate-0"} transition-transform`}>
        <FiChevronDown />
      </span>
    </button>
  );
};

export default EditButton;
