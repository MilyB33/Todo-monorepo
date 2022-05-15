import { Outlet } from "react-router-dom";
import ToastMessage from "../Generic/ToastMessage";

const MainLayout = () => {
  return (
    // text class temporary because i don't know how to add it in tailwind right now
    <main className="grid w-screen min-h-screen sm:h-screen bg-surface-900 text-text">
      <ToastMessage />
      <Outlet />
    </main>
  );
};

export default MainLayout;
