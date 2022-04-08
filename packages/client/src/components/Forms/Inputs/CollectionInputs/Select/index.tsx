import { useState } from "react";
import { DefaultProps, IIcon } from "../../../../../types";
import Typography from "../../../../Typography";
import { getIn } from "formik";
import { Dropdown as Input, DropdownChangeParams } from "primereact/dropdown";
import SelectItemTemplate from "./SelectItemTemplate";
import OptionItemTemplate from "./OptionItemTemplate";
import { useAppSelector } from "../../../../../store/app/hooks";

const Select = (props: DefaultProps) => {
  const {
    field: { name, value, onChange, onBlur },
    form: { setFieldTouched, touched, errors },
    label,
    placeholder,
  } = props;

  const { defaultIcons } = useAppSelector((state) => state.app);

  const [inputValue, setInputValue] = useState(value);

  const values = defaultIcons.map((icon: IIcon) => ({
    label: icon.name,
    value: icon.url,
  }));

  const hasError = Boolean(getIn(errors, name) && getIn(touched, name));

  const handleChange = (e: DropdownChangeParams) => {
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
        inputId={name}
        name={name}
        value={inputValue}
        aria-describedby={name}
        className={`!bg-text-pink ${hasError ? "text-input--error" : ""}`}
        panelClassName="!bg-text-pink"
        onChange={handleChange}
        onBlur={handleBlur}
        options={values}
        itemTemplate={OptionItemTemplate}
        valueTemplate={SelectItemTemplate}
        placeholder={placeholder}
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

export default Select;
