import { useState } from "react";
import { useAppSelector } from "../../store/app/hooks";
import CollectionCard from "./CollectionCard";
import AddCollectionButton from "../Buttons/AddCollectionButton";
import { Dialog } from "primereact/dialog";
import AddCollectionForm from "../Forms/AddCollectionForm";
import { ScrollPanel } from "primereact/scrollpanel";

const CollectionsWrapper = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { collections } = useAppSelector((state) => state.user);

  const handleOpenDialog = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);

  return (
    <>
      <ScrollPanel style={{ width: "100%", height: "80vh" }}>
        <section className="grid grid-cols-3 gap-5">
          {collections.map((collection) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))}
          <AddCollectionButton onClick={handleOpenDialog} />
        </section>
      </ScrollPanel>

      <Dialog
        header="Add Collection"
        visible={showDialog}
        modal={true}
        onHide={handleCloseDialog}
        keepInViewport
      >
        <AddCollectionForm />
      </Dialog>
    </>
  );
};

export default CollectionsWrapper;
