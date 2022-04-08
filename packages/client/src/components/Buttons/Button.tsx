interface IPropTypes {
  label: string;
  onClick(): void;
  styles?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({ label, onClick, styles, type = "button" }: IPropTypes) => {
  return (
    <button className={`${styles}`} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;
