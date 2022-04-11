import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/app/hooks";
import { selectCollection } from "../../store/slices/userSlice";
import GoBackButton from "../Buttons/GoBackButton";
import CollectionOverlayButton from "../Buttons/CollectionOverlayButton";
import Typography from "../Typography";

const CollectionHeader = () => {
  const { collectionId } = useParams();
  const collection = useAppSelector(selectCollection)(collectionId!)!;
  return (
    <header className="flex gap-10 items-center w-2/4">
      <GoBackButton />

      <Typography classNames="font-bold" variant="h2">
        {collection.name}
      </Typography>

      <CollectionOverlayButton _id={collection._id} />
    </header>
  );
};

export default CollectionHeader;
