import { Dialog, DialogProps } from "primereact/dialog";

interface PropTypes extends DialogProps {
  children: React.ReactNode;
}

const CollectionDialog = (props: PropTypes) => {
  const { children, ...rest } = props;
  return (
    <>
      <Dialog contentClassName="!bg-surface-900 rounded" blockScroll {...rest}>
        {props.children}
      </Dialog>
    </>
  );
};

export default CollectionDialog;
