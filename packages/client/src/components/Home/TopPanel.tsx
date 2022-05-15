import logo from "../../assets/logoX64.png";
import Typography from "../Typography";
import PrimaryButton from "../Buttons/ButtonPrimary";

const TopPanel = () => {
  return (
    <section className="flex items-center md:gap-3.5 gap-2 px-5 md:px-40 py-3">
      <img src={logo} alt="logo" />

      <Typography variant="h2">Name</Typography>

      <nav className="flex md:gap-5 ml-auto ">
        <PrimaryButton variant="link" to="/login" text="Log in" style="py-1 px-4 rounded-md" />

        <PrimaryButton
          variant="link"
          to="/register"
          text="Sign up"
          style="py-1 px-4 border-2 border-pink-300 rounded-md hover:bg-pink-300"
        />
      </nav>
    </section>
  );
};

export default TopPanel;
