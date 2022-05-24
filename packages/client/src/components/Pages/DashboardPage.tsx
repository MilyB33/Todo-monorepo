import { useVisibility } from "../../hooks/useVisibility";
import Typography from "../Typography";

import { useAuth } from "../../hooks/useAuth";
import LinkButton from "../Buttons/LinkButton";
import Button from "../Buttons/Button";
import AccountDialog from "../Dialogs//AccountDialog";
import CollectionsDashboard from "../Collections/CollectionsDashboard";

const DashboardPage = () => {
  const { visible, handleClose, handleOpen } = useVisibility();
  const { user } = useAuth();

  return (
    <section className="flex flex-col  gap-5 m-auto">
      <header className="grid gap-8">
        <Typography classNames="font-bold" variant="h2">
          Dashboard
        </Typography>

        <div>
          <Typography classNames="font-bold" variant="h3">
            Good morning,
          </Typography>

          <Typography classNames="font-bold" variant="h3">
            {`${user.name} ${user.surname}`}
          </Typography>
        </div>

        <div className="flex gap-5">
          <LinkButton
            to="/dashboard"
            label="Daily Overview"
            className="p-2 bg-pink-300 rounded-full"
          />
          <Button
            label="Account"
            className="p-2 border-pink-300 border-2 rounded-full"
            onClick={handleOpen}
          />

          <AccountDialog visible={visible} onHide={handleClose} />
        </div>
      </header>

      <CollectionsDashboard />
    </section>
  );
};

export default DashboardPage;
