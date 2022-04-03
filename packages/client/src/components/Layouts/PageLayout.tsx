import { Outlet } from "react-router-dom";
import TopNav from "../Navigation/TopNav";
import Collections from "../Navigation/Collections";

function PageLayout() {
  return (
    <div className="h-full grid grid-cols-layout grid-rows-layout">
      <TopNav />
      <Collections />
      <Outlet />
    </div>
  );
}

export default PageLayout;
