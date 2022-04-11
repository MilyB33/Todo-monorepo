import { useAppSelector } from "../../store/app/hooks";
import CollectionCard from "./CollectionCard";
import AddCollectionButton from "../Buttons/AddCollectionButton";

const CollectionsWrapper = () => {
  const { collections } = useAppSelector((state) => state.user);

  return (
    <section className="grid grid-cols-3 gap-5">
      {collections.map((collection) => (
        <CollectionCard key={collection._id} collection={collection} />
      ))}
      <AddCollectionButton />
    </section>
  );
};

export default CollectionsWrapper;
