import { useState } from "react";
import { InputText as Input } from "primereact/inputtext";
import { TextInputPropTypes } from "../../../../types";
import { getIn } from "formik";
import Typography from "../../../Typography";

const TextInput = (props: TextInputPropTypes) => {
  const {
    field: { name, value, onChange, onBlur },
    form: { setFieldTouched, touched, errors },
    placeholder,
    label,
    classNames,
    labelColor,
    icon,
  } = props;

  const [inputValue, setInputValue] = useState(value);

  const hasError = Boolean(getIn(errors, name) && getIn(touched, name));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldTouched(name, true, false);
    onBlur(e);
  };

  return (
    <div className="grid gap-3">
      <label
        htmlFor={name}
        className={`block ${hasError ? "text-defaults-error" : `${labelColor || "text-text"}`}`}
      >
        {label}
      </label>

      <span className="p-input-icon-right ">
        <Input
          id={name}
          name={name}
          value={inputValue}
          aria-describedby={name}
          className={`${classNames} ${hasError ? "text-input--error" : ""} !w-full`}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
        {/* {icon && <i className={`pi ${icon} !text-blue`} />} */}
      </span>

      <Typography
        variant="small"
        classNames={`text-defaults-error min-h-[2.5ch] ${hasError ? "visible" : "invisible"}`}
      >
        {getIn(errors, name)}
      </Typography>
    </div>
  );
};

export default TextInput;
