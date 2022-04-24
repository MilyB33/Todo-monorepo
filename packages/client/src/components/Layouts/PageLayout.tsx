import { Outlet } from "react-router-dom";
import TopNav from "../Navigation/TopNav";
import Collections from "../Navigation/Collections";

function PageLayout() {
  return (
    <div className="h-full grid grid-rows-layout">
      <TopNav />
      <div className="grid grid-cols-layout">
        <Collections />

        <main className="flex flex-col gap-5 justify-center ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PageLayout;
