import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const BackToHomeButton = () => {
  const navigate = useNavigate();

  const handleRedirect = () => navigate("/");

  return (
    <Button
      onClick={handleRedirect}
      icon="pi pi-home text-blue "
      className="bg-text border-text   p-button-raised p-button-rounded p-button-lg absolute top-5 left-5"
    />
  );
};

export default BackToHomeButton;
