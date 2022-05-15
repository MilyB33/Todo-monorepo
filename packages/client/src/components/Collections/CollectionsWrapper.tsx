import { useState } from "react";
import { useAppSelector } from "../../store/app/hooks";
import CollectionCard from "./CollectionCard";
import AddCollectionButton from "../Buttons/AddCollectionButton";
import CollectionDialog from "../Dialogs/CollectionDialog";
import AddCollectionForm from "../Forms/AddCollectionForm";

const CollectionsWrapper = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { collections } = useAppSelector((state) => state.user);

  const handleOpenDialog = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);

  return (
    <>
      <section className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-5">
        {collections.map((collection) => (
          <CollectionCard key={collection._id} collection={collection} />
        ))}
        <AddCollectionButton onClick={handleOpenDialog} />
      </section>

      <CollectionDialog
        header="Add Collection"
        visible={showDialog}
        modal={true}
        onHide={handleCloseDialog}
        keepInViewport
      >
        <AddCollectionForm />
      </CollectionDialog>
    </>
  );
};

export default CollectionsWrapper;
