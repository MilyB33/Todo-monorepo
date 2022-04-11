import CollectionsWrapper from "../Collections/CollectionsWrapper";
import DashboardHeader from "../Header/DashboardHeader";

const CollectionsPage = () => {
  return (
    <main className="flex flex-col items-center gap-5 justify-center col-auto">
      <section className="grid gap-5">
        <DashboardHeader>Collections</DashboardHeader>

        <CollectionsWrapper />
      </section>
    </main>
  );
};

export default CollectionsPage;
