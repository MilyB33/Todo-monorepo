import AuthSlider from "../AuthSlider/AuthSlider";
import RegisterForm from "../Forms/RegisterForm";

const RegisterPage = () => {
  return (
    <main className="grid md:grid-cols-2 h-full">
      <AuthSlider />
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
