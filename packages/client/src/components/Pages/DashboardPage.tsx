import Typography from "../Typography";
import SubPageButton from "../Collections/SubPageButton";
import { useAuth } from "../../hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();
  return (
    <header className="grid gap-8 mx-auto">
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

      <div className="flex justify-center gap-5">
        <SubPageButton to="/dashboard" text="Daily Overview" />
        <SubPageButton to="/dashboard/statistics" text="Statistics" />
      </div>
    </header>
  );
};

export default DashboardPage;
