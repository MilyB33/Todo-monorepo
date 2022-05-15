import Typography from "../Typography";
import GoBackButton from "../Buttons/GoBackButton";

interface PropTypes {
  children: React.ReactNode | string;
  style?: string;
}

const DashboardHeader = ({ children, style }: PropTypes) => {
  return (
    <header className={`${style || ""} flex gap-5 items-center`}>
      <GoBackButton />

      <Typography classNames="font-bold" variant="h2">
        {children}
      </Typography>
    </header>
  );
};

export default DashboardHeader;
