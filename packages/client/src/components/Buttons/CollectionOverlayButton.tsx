import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

interface PropTypes {
  _id: string;
}

const UserOverlay = ({ _id }: PropTypes) => {
  const menu = useRef<Menu>(null);
  const items = [
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      command: () => {},
    },
    {
      label: "Delete",
      icon: "pi pi-fw pi-trash",
      command: () => {},
    },
    {
      label: "More",
      icon: "pi pi-fw pi-cog",
      command: () => {},
    },
  ];

  const handleToogle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (menu.current) {
      menu.current.toggle(event);
    }
  };

  return (
    <div className="flex ml-auto items-center justify-center">
      <Menu model={items} popup ref={menu} id="popup_menu" />
      <Button
        icon="pi pi-ellipsis-h"
        iconPos="right"
        onClick={handleToogle}
        aria-controls="popup_menu"
        aria-haspopup
        className="text-text hover:!text-text !bg-transparent p-3 rounded-full  !transition-colors border-none"
      />
    </div>
  );
};

export default UserOverlay;
