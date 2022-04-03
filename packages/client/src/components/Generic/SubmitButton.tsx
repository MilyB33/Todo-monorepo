import { Button } from "primereact/button";

interface IPropTypes {
  loading?: boolean;
  label: string;
  onSubmit(): void;
  disabled?: boolean;
}

const SubmitButton = ({ loading = false, label, onSubmit, disabled = false }: IPropTypes) => {
  return (
    <Button
      disabled={disabled}
      label={label}
      onClick={onSubmit}
      loading={loading}
      className="bg-blue font-bold text-text opacity-70 hover:opacity-100 hover:!bg-blue hover:!text-text"
      type="submit"
    />
  );
};

export default SubmitButton;
