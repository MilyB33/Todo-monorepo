import Typography from "../Typography";
import GoBackButton from "../Buttons/GoBackButton";

interface PropTypes {
  children: React.ReactNode | string;
  className?: string;
}

const DashboardHeader = ({ children, className }: PropTypes) => {
  return (
    <header className={`${className} flex gap-5 items-center`}>
      <GoBackButton />

      <Typography classNames="font-bold" variant="h2">
        {children}
      </Typography>
    </header>
  );
};

export default DashboardHeader;
