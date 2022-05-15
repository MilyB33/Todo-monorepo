import { useState } from "react";
import { Calendar as CalendarInput, CalendarChangeParams } from "primereact/calendar";
import { CalendarPropTypes } from "../../../../types";
import { getIn } from "formik";
import Typography from "../../../Typography";

const Calendar = (props: CalendarPropTypes) => {
  const {
    field: { name, value, onChange, onBlur },
    form: { setFieldTouched, touched, errors },
    placeholder,
    label,
    isTime = false,
    isIcon = false,
    classNames,
  } = props;

  const [date, setDate] = useState<Date | Date[] | undefined>(value);

  const handleChange = (e: CalendarChangeParams) => {
    console.log(e.value);
    setDate(e.value);
    onChange(e);
  };

  const hasError = Boolean(getIn(errors, name) && getIn(touched, name));

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFieldTouched(name, true, false);
    onBlur(e);
  };

  return (
    <div className={classNames}>
      <label htmlFor={name} className={`block ${hasError ? "text-defaults-error" : "text-text"}`}>
        {label}
      </label>

      <CalendarInput
        id={name}
        name={name}
        inputClassName={`${classNames} ${
          hasError ? "border-defaults-error" : "border-text"
        } rounded border-[#3f4b5b]`}
        className="!text-text"
        value={date}
        onChange={handleChange}
        showIcon={isIcon}
        onBlur={handleBlur}
        placeholder={placeholder}
        timeOnly={isTime}
        readOnlyInput
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

export default Calendar;
