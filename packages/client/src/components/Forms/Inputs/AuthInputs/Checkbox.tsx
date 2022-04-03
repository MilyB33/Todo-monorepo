import { useState } from "react";
import { Checkbox as Input, CheckboxChangeParams } from "primereact/checkbox";
import { DefaultProps } from "../../../../types";

const Checkbox = (props: DefaultProps<boolean>) => {
  const {
    field: { name, value, onChange, onBlur },
    form: { setFieldTouched },
    label,
  } = props;

  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: CheckboxChangeParams) => {
    setInputValue(e.target.checked);
    onChange(e);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldTouched(name, true, false);
    onBlur(e);
  };

  return (
    <div className="field flex items-center gap-2">
      <Input
        id={name}
        name={name}
        value={inputValue}
        aria-describedby={name}
        checked={inputValue}
        onChange={handleChange}
        className="checkbox"
        icon="pi pi-check !text-text"
      />

      <label htmlFor={name} className="block text-text-dark">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
