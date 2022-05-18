import Typography from "../Typography";

import { useAuth } from "../../hooks/useAuth";
import LinkButton from "../Buttons/LinkButton";

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

      <div className="flex justify-center gap-5">
        <LinkButton
          to="/dashboard"
          label="Daily Overview"
          className="p-2 bg-pink-300 rounded-full"
        />
        <LinkButton
          to="/account"
          label="Account"
          className="p-2 border-pink-300 border-2 rounded-full"
        />
      </div>
    </header>
  );
};

export default DashboardPage;
