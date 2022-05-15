import PersonalInfo from "../User/PersonalInfo";
import DashboardHeader from "../Header/DashboardHeader";

const AccountPage = () => {
  return (
    <section className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-5">
        <DashboardHeader>Account</DashboardHeader>

        <PersonalInfo />
      </div>
    </section>
  );
};

export default AccountPage;
