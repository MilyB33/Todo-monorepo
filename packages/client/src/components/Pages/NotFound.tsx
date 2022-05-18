import LinkButton from "../Buttons/LinkButton";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Typography from "../Typography";

const NotFound = () => {
  return (
    <main className="flex flex-col h-full w-full items-center justify-center">
      <h2 className="flex sm:text-[25vw] text-pink-300 p-0 leading-none">404</h2>

      <LinkButton to="/" className="flex items-center gap-2 bg-pink-300">
        <AiOutlineArrowLeft />
        Go to home page
      </LinkButton>
    </main>
  );
};

export default NotFound;
