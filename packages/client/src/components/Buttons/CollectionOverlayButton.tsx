import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { useAppDispatch } from "../../store/app/hooks";
import { removeCollection } from "../../store/slices/collectionsSlice";
import { useMutation } from "@apollo/client";
import { queries } from "../../clients/ApolloClient";
import { useNavigate } from "react-router-dom";
import { useToastMessage } from "../../hooks/useToastMessage";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

interface PropTypes {
  _id: string;
  handleOpenDialog: () => void;
}

const UserOverlay = ({ _id, handleOpenDialog }: PropTypes) => {
  const { handleSuccess, handleError } = useToastMessage();
  const menu = useRef<Menu>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteCollection] = useMutation(queries.mutation.DELETE_COLLECTION, {
    onCompleted: (data) => {
      navigate("/collections");
      console.log(_id);
      dispatch(removeCollection(_id));
      handleSuccess(data.deleteCollection.message);
    },
    onError: (error) => {
      console.log(error.message);
      handleError(error.message);
    },
  });

  const handleDelete = () => {
    deleteCollection({
      variables: {
        input: {
          _id,
        },
      },
    });
  };

  const confirm = () => {
    confirmDialog({
      message: "Are you sure you want to delete this collection?",
      header: "Delete Collection",
      acceptLabel: "Delete",
      rejectLabel: "Cancel",
      accept: handleDelete,
      reject: () => {
        console.log("Rejected");
      },
    });
  };

  const items = [
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      command: handleOpenDialog,
    },
    {
      label: "Delete",
      icon: "pi pi-fw pi-trash",
      command: confirm,
    },
  ];

  const handleToogle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (menu.current) {
      menu.current.toggle(event);
    }
  };

  return (
    <div>
      <Menu model={items} popup ref={menu} id="popup_menu" />
      <Button
        icon="pi pi-ellipsis-h"
        iconPos="right"
        onClick={handleToogle}
        aria-controls="popup_menu"
        aria-haspopup
        className="text-text hover:!text-text !bg-transparent p-3 rounded-full  !transition-colors border-none"
      />
      <ConfirmDialog />
    </div>
  );
};

export default UserOverlay;
