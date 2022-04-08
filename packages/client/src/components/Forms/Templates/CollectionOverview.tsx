import Typography from "../../Typography";
import { Link } from "react-router-dom";

interface IPropTypes {
  icon: string;
  label: string;
  color: string;
}

const CollectionOverview = ({ icon, label, color }: IPropTypes) => {
  return (
    <div className="grid gap-5">
      <Typography variant="h5">Overview: </Typography>

      <div className="py-4 hover:bg-gray-600 transition-colors cursor-pointer">
        <Link to="" className="flex gap-3 justify-center items-center">
          <div className="p-1 rounded " style={{ backgroundColor: `#${color}` }}>
            <img src={icon} alt="Collection" />
          </div>
          <Typography>{label}</Typography>
        </Link>
      </div>
    </div>
  );
};

export default CollectionOverview;
