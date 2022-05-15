import CollectionsWrapper from "../Collections/CollectionsWrapper";
import DashboardHeader from "../Header/DashboardHeader";

const CollectionsPage = () => {
  return (
    <section className="flex flex-col gap-5 mx-[5%] md:mx-[15%] h-full">
      <DashboardHeader>Collections</DashboardHeader>

      <CollectionsWrapper />
    </section>
  );
};

export default CollectionsPage;
