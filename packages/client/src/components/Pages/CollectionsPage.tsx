import CollectionsWrapper from "../Collections/CollectionsWrapper";
import DashboardHeader from "../Header/DashboardHeader";
import { ScrollPanel } from "primereact/scrollpanel";

const CollectionsPage = () => {
  return (
    <ScrollPanel
      style={{
        width: "100%",
        height: "85vh",
      }}
    >
      <section className="flex flex-col gap-5 mx-[5%] md:mx-[15%] h-full">
        <DashboardHeader>Collections</DashboardHeader>

        <CollectionsWrapper />
      </section>
    </ScrollPanel>
  );
};

export default CollectionsPage;
