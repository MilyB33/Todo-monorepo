import Typography from "../Typography";
import { Link } from "react-router-dom";
import { ICollection } from "../../types";

interface PropTypes {
  collection: ICollection;
}

const Collection = ({ collection }: PropTypes) => {
  return (
    <div className="py-4 hover:bg-gray-600 transition-colors cursor-pointer">
      <Link to={`/collection/${collection._id}`} className="flex gap-3 justify-center items-center">
        <div className="p-1 rounde" style={{ backgroundColor: `#${collection.color}` }}>
          <img src={collection.iconUrl} alt="Collection" />
        </div>
        <Typography>{collection.name}</Typography>
      </Link>
    </div>
  );
};

export default Collection;
