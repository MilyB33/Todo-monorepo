interface IPropTypes {
  label: string;
  onClick(): void;
  styles?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({ label, onClick, styles, type = "button", disabled = false }: IPropTypes) => {
  return (
    <button className={`${styles}`} onClick={onClick} type={type} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
