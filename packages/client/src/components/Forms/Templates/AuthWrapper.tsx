import logo from "../../../assets/logoX128.png";
import Typography from "../../Typography";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

interface IPropTypes {
  children: React.ReactNode | string;
  header: {
    pink: string;
    blue: string;
  };
  bottom: {
    text: string;
    linkText: string;
    to: string;
  };
}

function AuthWrapper({ children, header, bottom }: IPropTypes) {
  return (
    <section className="bg-gray-200 flex flex-col gap-5 justify-center items-center relative p-5">
      <Link
        to="/"
        className="bg-text text-lg border-tex text-blue p-2 rounded-full absolute top-5 left-5"
      >
        <AiOutlineHome />
      </Link>

      <img src={logo} alt="logo" />

      <Typography classNames="text-pink-300 uppercase text-center font-bold" variant="h1">
        {header.pink} <span className="text-blue">{header.blue}</span>
      </Typography>

      {children}

      <div className="flex text-text-dark gap-5">
        <Typography>{bottom.text}</Typography>
        <Link to={bottom.to} className="text-blue ml-auto hover:underline">
          {bottom.linkText}
        </Link>
      </div>
    </section>
  );
}

export default AuthWrapper;
