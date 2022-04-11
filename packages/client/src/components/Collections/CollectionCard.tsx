import Typography from "../Typography";
import { Link } from "react-router-dom";
import { ICollection } from "../../types";
import { Knob } from "primereact/knob";
import CollectionOverlayButton from "../Buttons/CollectionOverlayButton";

interface PropTypes {
  collection: ICollection;
}

const Collection = ({ collection }: PropTypes) => {
  return (
    <div className="hover:bg-gray-600 transition-colors cursor-pointer bg-gray-800 rounded ">
      <Link to={`/collections/${collection._id}`} className="grid gap-3 px-8 py-5">
        <div className="p-1 rounded mr-auto" style={{ backgroundColor: `#${collection.color}` }}>
          <img src={collection.iconUrl} alt="Collection" />
        </div>

        <Typography>{collection.name}</Typography>

        <div className="flex items-end">
          <Typography variant="small" classNames="text-text-pink">
            4 / 5 done
          </Typography>

          <Knob value={4} max={5} size={25} showValue={false} className="ml-auto" />
        </div>
      </Link>
    </div>
  );
};

export default Collection;
