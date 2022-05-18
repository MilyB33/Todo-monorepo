import { useState } from "react";
import Typography from "../../../Typography";
import { ColorPicker as Input, ColorPickerChangeParams } from "primereact/colorpicker";
import { DefaultProps } from "../../../../types";
import { getIn } from "formik";

const Color = (props: DefaultProps) => {
  const {
    field: { name, value, onChange, onBlur },
    form: { setFieldTouched, touched, errors },
    label,
  } = props;

  const [inputValue, setInputValue] = useState(value);

  const hasError = Boolean(getIn(errors, name) && getIn(touched, name));

  const handleChange = (e: ColorPickerChangeParams) => {
    setInputValue(e.value as string);
    onChange(e);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldTouched(name, true, false);
    onBlur(e);
  };

  return (
    <div className="grid gap-3">
      <label htmlFor={name} className={`block ${hasError ? "text-defaults-error" : "text-text"}`}>
        {label}
      </label>

      <Input
        id={name}
        name={name}
        value={inputValue}
        aria-describedby={name}
        className={`${hasError ? "text-input--error" : ""}`}
        onChange={handleChange}
        onBlur={handleBlur}
        format="hex"
        defaultColor="#ffffff"
      />

      <Typography
        variant="small"
        classNames={`text-defaults-error min-h-[2.5ch] ${hasError ? "visible" : "invisible"}`}
      >
        {getIn(errors, name)}
      </Typography>
    </div>
  );
};

export default Color;
