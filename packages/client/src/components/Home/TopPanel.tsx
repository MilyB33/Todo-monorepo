import logo from "../../assets/logoX64.png";
import Typography from "../Typography";
import LinkButton from "../Buttons/LinkButton";

const TopPanel = () => {
  return (
    <section className="flex items-center md:gap-3.5 gap-2 px-5 md:px-40 py-3">
      <img src={logo} alt="logo" />

      <Typography variant="h3">Name</Typography>

      <nav className="flex md:gap-5 ml-auto ">
        <LinkButton to="/login" label="Log in" className="py-1 px-4 rounded-md" />

        <LinkButton
          to="/register"
          label="Sign up"
          className="py-1 px-4 border-2 border-pink-300 rounded-md hover:bg-pink-300"
        />
      </nav>
    </section>
  );
};

export default TopPanel;
