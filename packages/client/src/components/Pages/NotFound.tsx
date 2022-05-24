import LinkButton from "../Buttons/LinkButton";
import { AiOutlineArrowLeft } from "react-icons/ai";

const NotFound = () => {
  return (
    <main className="flex flex-col h-full w-full items-center justify-center">
      <p className="flex text-[clamp(150px,25vw,300px)] text-pink-300 p-0 leading-none">404</p>

      <LinkButton to="/" className="flex items-center gap-2 bg-pink-300">
        <AiOutlineArrowLeft />
        Go to home page
      </LinkButton>
    </main>
  );
};

export default NotFound;
