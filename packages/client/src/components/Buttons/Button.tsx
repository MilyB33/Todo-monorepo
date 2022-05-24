interface IPropTypes
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
  label?: string;
  className?: string;
  defaultStyles?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  onClick?(): void;
}

const Button = (props: IPropTypes) => {
  const {
    children,
    label,
    className,
    type = "button",
    defaultStyles = true,
    disabled = false,
    loading = false,
    ...rest
  } = props;

  return (
    <>
      <button
        className={`${defaultStyles && "button"} ${className}`}
        type={type}
        disabled={disabled || loading}
        {...rest}
      >
        {loading ? "loading" : children || label}
      </button>
    </>
  );
};

export default Button;
