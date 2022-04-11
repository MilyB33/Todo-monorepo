import Typography from "../Typography";
import GoBackButton from "../Buttons/GoBackButton";

interface PropTypes {
  children: React.ReactNode | string;
}

const DashboardHeader = ({ children }: PropTypes) => {
  return (
    <header className="flex gap-5 items-center">
      <GoBackButton />

      <Typography classNames="font-bold" variant="h2">
        {children}
      </Typography>
    </header>
  );
};

export default DashboardHeader;
