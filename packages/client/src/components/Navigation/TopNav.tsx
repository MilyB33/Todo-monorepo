import { Link } from "react-router-dom";

import { BsFillGridFill, BsCollectionFill } from "react-icons/bs";
import Typography from "../Typography";
import UserOverlay from "./UserOverlay";

const Navigation = () => {
  return (
    <nav className="flex gap-5 px-2 py-5 bg-gray-800 col-span-full z-0 sm:px-10">
      <Link to="/dashboard" className="flex gap-2 hover:underline items-center">
        <BsFillGridFill className="h-5 w-5 text-blue" />
        <Typography variant="button">Dashboard</Typography>
      </Link>
      <Link to="/collections" className="flex gap-2 hover:underline items-center">
        <BsCollectionFill className="h-5 w-5 text-blue" />
        <Typography variant="button">Collections</Typography>
      </Link>

      <UserOverlay />
    </nav>
  );
};

export default Navigation;
