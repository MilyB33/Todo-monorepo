import Collection from "../Collection";
import CollectionHeader from "../Header/CollectionHeader";

const CollectionPage = () => {
  return (
    <main className="flex flex-col gap-5 justify-center items-center">
      <CollectionHeader />
      <Collection />
    </main>
  );
};

export default CollectionPage;
