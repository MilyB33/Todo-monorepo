import CollectionsWrapper from "../Collections/CollectionsWrapper";
import DashboardHeader from "../Header/DashboardHeader";

const CollectionsPage = () => {
  return (
    <section className="grid gap-5 mx-[15%]">
      <DashboardHeader>Collections</DashboardHeader>

      <CollectionsWrapper />
    </section>
  );
};

export default CollectionsPage;
