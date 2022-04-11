import { AiOutlinePlus } from "react-icons/ai";

const AddCollectionButton = () => {
  return (
    <button className="h-min py-5 flex justify-center border-text-secondary border-2 border-dashed  transition-all hover:scale-105 ">
      <AiOutlinePlus />
    </button>
  );
};

export default AddCollectionButton;
