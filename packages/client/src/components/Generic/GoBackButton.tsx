import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate("/");

  return (
    <Button
      onClick={handleGoBack}
      icon="pi pi-home text-blue "
      className="bg-text border-text   p-button-raised p-button-rounded p-button-lg absolute top-5 left-5"
    />
  );
};

export default GoBackButton;
