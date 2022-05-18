import { Outlet } from "react-router-dom";
import ToastMessage from "../Generic/ToastMessage";

const MainLayout = () => {
  return (
    <main className="grid w-screen min-h-screen bg-surface-900 text-text">
      <ToastMessage />
      <Outlet />
    </main>
  );
};

export default MainLayout;
