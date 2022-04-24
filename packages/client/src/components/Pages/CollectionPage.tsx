import { useState } from "react";
import Collection from "../Collection";
import CollectionHeader from "../Header/CollectionHeader";

const CollectionPage = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleOpen = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  return (
    <section className="grid gap-5 mx-[15%]">
      <CollectionHeader handleOpenDialog={handleOpen} />
      <Collection showDialog={showDialog} onHide={handleClose} />
    </section>
  );
};

export default CollectionPage;
