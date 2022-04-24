import { BsFillPenFill } from "react-icons/bs";

interface PropTypes {
  url: string;
}

const Avatar = ({ url }: PropTypes) => {
  return (
    <div className="relative w-fit">
      <button className="bg-pink p-2 rounded-full absolute top-px right-px hover:bg-text-pink transition-colors">
        <BsFillPenFill />
      </button>
      <img src={url} alt="avatar" />
    </div>
  );
};

export default Avatar;
