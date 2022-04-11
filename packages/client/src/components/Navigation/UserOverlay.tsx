import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

const UserOverlay = () => {
  const menu = useRef<Menu>(null);
  const navigate = useNavigate();
  const {
    handleLogout,
    user: { username },
  } = useAuth();

  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/dashboard");
      },
    },
    {
      label: "Collections",
      icon: "pi pi-fw pi-list",
      command: () => {
        navigate("/collections");
      },
    },
    {
      label: "Account",
      icon: "pi pi-fw pi-user",
      command: () => {
        navigate("/account");
      },
    },
    {
      label: "Log out",
      icon: "pi pi-fw pi-sign-out",
      command: () => {
        handleLogout();
      },
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
        label={username}
        icon="pi pi-bars"
        iconPos="right"
        onClick={handleToogle}
        aria-controls="popup_menu"
        aria-haspopup
        className="text-text hover:!text-text bg-pink-300 p-3 rounded-full hover:!bg-pink-200 !transition-colors border-none"
      />
    </div>
  );
};

export default UserOverlay;
