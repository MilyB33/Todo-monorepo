import ForgotPasswordForm from "../Forms/ForgotPasswordForm";
import AuthSlider from "../AuthSlider/AuthSlider";

const ForgotPasswordPage = () => {
  return (
    <main className="grid md:grid-cols-2 h-full">
      <AuthSlider />
      <ForgotPasswordForm />
    </main>
  );
};

export default ForgotPasswordPage;
