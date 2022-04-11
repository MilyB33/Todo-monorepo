import { useState } from "react";
import { Calendar as CalendarInput, CalendarChangeParams } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

const Calendar = () => {
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevYear = prevMonth === 11 ? year - 1 : year;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year + 1 : year;

  const [date, setDate] = useState<Date | Date[] | undefined>(undefined);

  const handleChange = (event: CalendarChangeParams) => {
    setDate(event.value);
  };

  return (
    <div className="">
      <CalendarInput value={date} onChange={handleChange} showIcon />
    </div>
  );
};

export default Calendar;
