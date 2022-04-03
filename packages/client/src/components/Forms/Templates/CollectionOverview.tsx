import Typography from "../../Typography";
import { Link } from "react-router-dom";
import archiveIcon from "../../../assets/archiveX16.png"; // Icons will be fetched from the server but for now we will use the local ones

interface IPropTypes {
  icon: string;
  label: string;
  color: string;
}

const CollectionOverview = ({ icon, label, color }: IPropTypes) => {
  return (
    <div>
      <Typography variant="h4">Overview: </Typography>

      <div className="py-4 hover:bg-gray-600 transition-colors cursor-pointer">
        <Link to="" className="flex gap-3 justify-center items-center">
          <div className="p-1 rounded " style={{ backgroundColor: `#${color}` }}>
            <img src={archiveIcon} alt="Collection" />
          </div>
          <Typography>{label}</Typography>
        </Link>
      </div>
    </div>
  );
};

export default CollectionOverview;
