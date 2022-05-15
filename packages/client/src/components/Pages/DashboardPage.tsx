import Typography from "../Typography";

import { useAuth } from "../../hooks/useAuth";
import PrimaryButton from "../Buttons/ButtonPrimary";

const DashboardPage = () => {
  const { user } = useAuth();
  return (
    <header className="grid gap-8 m-auto">
      <Typography classNames="font-bold" variant="h2">
        Dashboard
      </Typography>

      <div>
        <Typography classNames="font-bold" variant="h1">
          Good morning,
        </Typography>
        <Typography classNames="font-bold" variant="h1">
          {`${user.name} ${user.surname}`}
        </Typography>
      </div>

      {/* this will be moved as separate component as soon as statistic page will be created */}
      <div className="flex justify-center gap-5">
        <PrimaryButton
          variant="link"
          to="/dashboard"
          text="Daily Overview"
          style="p-2 bg-pink-300 rounded-full"
        />
        <PrimaryButton
          variant="link"
          to="/dashboard/statistics"
          text="Statistics"
          style="p-2 border-pink-300 border-2 rounded-full"
        />
      </div>
    </header>
  );
};

export default DashboardPage;
