import { useState } from "react";
import Collection from "../Collection";
import CollectionHeader from "../Header/CollectionHeader";
import { ScrollPanel } from "primereact/scrollpanel";

const CollectionPage = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleOpen = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  return (
    <ScrollPanel
      style={{
        width: "100%",
        height: "85vh",
      }}
    >
      <section className="grid gap-3 md:mx-[10%]">
        <CollectionHeader handleOpenDialog={handleOpen} />
        <Collection showDialog={showDialog} onHide={handleClose} />
      </section>
    </ScrollPanel>
  );
};

export default CollectionPage;
