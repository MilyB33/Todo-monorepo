import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Menu } from "primereact/menu";
import { FaBars } from "react-icons/fa";
import Typography from "../Typography";

const UserOverlay = () => {
  const menu = useRef<Menu>(null);
  const navigate = useNavigate();
  const {
    handleLogout,
    user: { name, surname },
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

      <button
        onClick={handleToogle}
        aria-controls="popup_menu"
        aria-haspopup
        className=" bg-pink-300 p-2 sm:p-3 rounded hover:bg-pink-200 transition-colors"
      >
        <Typography variant="button" classNames="flex items-center gap-2">
          {`${name} ${surname}`}
          <FaBars />
        </Typography>
      </button>
    </div>
  );
};

export default UserOverlay;
