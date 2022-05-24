import { Dialog, DialogProps } from "primereact/dialog";
import PersonalInfo from "../User/PersonalInfo";

const CollectionDialog = (props: DialogProps) => {
  return (
    <>
      <Dialog contentClassName="!bg-surface-900 rounded" blockScroll {...props} header="Account">
        <PersonalInfo />
      </Dialog>
    </>
  );
};

export default CollectionDialog;
