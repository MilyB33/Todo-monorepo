import { Link } from "react-router-dom";
import { ViewGridIcon, CollectionIcon } from "@heroicons/react/solid";
import Typography from "../Typography";
import UserOverlay from "./UserOverlay";

const Navigation = () => {
  return (
    <nav className="flex gap-5 px-10 py-5 bg-gray-800 col-span-full shadow-lg z-0">
      <Link to="/dashboard" className="flex gap-2 hover:underline items-center">
        <ViewGridIcon className="h-5 w-5 text-blue" />
        <Typography>Dashboard</Typography>
      </Link>
      <Link to="/collections" className="flex gap-2 hover:underline items-center">
        <CollectionIcon className="h-5 w-5 text-blue" />
        <Typography>Collections</Typography>
      </Link>

      <UserOverlay />
    </nav>
  );
};

export default Navigation;
