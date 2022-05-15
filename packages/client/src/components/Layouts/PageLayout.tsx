import { Outlet } from "react-router-dom";
import TopNav from "../Navigation/TopNav";
import Collections from "../Navigation/Collections";

function PageLayout() {
  return (
    <>
      <div className="h-full grid grid-rows-layout">
        <TopNav />
        <div className="grid md:grid-cols-layout grid-cols-1 relative">
          <Collections />

          <main className="flex flex-col gap-2 p-2 h-full">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default PageLayout;
