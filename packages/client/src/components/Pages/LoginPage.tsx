import LoginForm from "../Forms/LoginForm";
import AuthSlider from "../AuthSlider/AuthSlider";

const LoginPage = () => {
  return (
    <main className="grid md:grid-cols-2 h-full">
      <AuthSlider />
      <LoginForm />
    </main>
  );
};

export default LoginPage;
