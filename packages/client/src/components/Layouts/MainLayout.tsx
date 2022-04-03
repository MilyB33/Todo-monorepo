import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    // text class temporary because i don't know how to add it in tailwind right now
    <main className="w-screen h-screen bg-surface-900 text-text flex flex-col">
      <Outlet />
    </main>
  );
};

export default MainLayout;
