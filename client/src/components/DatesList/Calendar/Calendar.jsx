import { DayPicker } from "react-day-picker";

import styles from "./Calendar.module.scss";

const Calendar = ({ allDates, handleDayClick, modifiers }) => {
  return (
    <DayPicker
      mode='single'
      selected={allDates}
      onDayClick={handleDayClick}
      modifiers={modifiers}
      navLayout='around'
      modifiersClassNames={{
        completed: styles["completed-day"],
        pending: styles["pending-day"],
        hidden: styles["hidden"],
      }}
      showOutsideDays={false}
      startMonth={new Date(allDates[0])}
      endMonth={new Date(allDates[allDates.length - 1])}
    />
  );
};

export default Calendar;
