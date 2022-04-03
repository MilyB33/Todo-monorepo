import { ArchiveIcon } from "@heroicons/react/solid";
import Typography from "../Typography";
import { Link } from "react-router-dom";

const Collection = () => {
  return (
    <div className="py-4 hover:bg-gray-600 transition-colors cursor-pointer">
      <Link to="/" className="flex gap-3 justify-center items-center">
        <div className="p-1 rounded bg-text-pink">
          <ArchiveIcon className="h-5 w-5" />
        </div>
        <Typography>Collection</Typography>
      </Link>
    </div>
  );
};

export default Collection;
