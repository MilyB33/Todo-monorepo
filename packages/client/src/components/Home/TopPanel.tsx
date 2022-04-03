import logo from "../../assets/logoX64.png";
import AuthButton from "./AuthButton";
import Typography from "../Typography";

const TopPanel = () => {
  return (
    <section className="flex items-center md:gap-3.5 gap-2 px-5 md:px-40 py-3">
      <img src={logo} alt="logo" />
      <Typography variant="h1">Name</Typography>

      <nav className="flex md:gap-5 ml-auto ">
        <AuthButton to="/login" classNames="hover:text-pink-300">
          Log in
        </AuthButton>
        <AuthButton
          to="/register"
          classNames="border-2 border-pink-300 rounded-md hover:bg-pink-300"
        >
          Sign up
        </AuthButton>
      </nav>
    </section>
  );
};

export default TopPanel;
