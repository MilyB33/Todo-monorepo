import Typography from "../Typography";
import { Link } from "react-router-dom";
import { ICollection } from "../../types";
import { Knob } from "primereact/knob";

interface PropTypes {
  collection: ICollection;
}

const Collection = ({ collection }: PropTypes) => {
  const completed = collection.tasks.filter((task) => task.completed).length;
  const total = collection.tasks.length;

  return (
    <div className="hover:bg-gray-600 transition-colors cursor-pointer bg-gray-800 rounded ">
      <Link to={`/collections/${collection._id}`} className="grid gap-3 px-8 py-5">
        <div className="p-1 rounded mr-auto" style={{ backgroundColor: `#${collection.color}` }}>
          <img src={collection.iconUrl} alt="Collection" />
        </div>

        <Typography>{collection.name}</Typography>

        <div className="flex items-end">
          <Typography variant="small" classNames="text-text-pink">
            {completed}/{total}
          </Typography>

          <Knob value={completed} max={total} size={25} showValue={false} className="ml-auto" />
        </div>
      </Link>
    </div>
  );
};

export default Collection;
