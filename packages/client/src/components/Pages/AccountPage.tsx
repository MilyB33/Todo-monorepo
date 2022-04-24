import PersonalInfo from "../User/PersonalInfo";
import DashboardHeader from "../Header/DashboardHeader";

const AccountPage = () => {
  return (
    <section className="grid gap-5 w-1/4 mx-auto">
      <DashboardHeader>Account</DashboardHeader>
      <PersonalInfo />
    </section>
  );
};

export default AccountPage;
