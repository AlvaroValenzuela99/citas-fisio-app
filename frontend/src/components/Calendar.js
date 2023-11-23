import React, { useRef } from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = ({ onMonthChange, onDayClick }) => {

  const calendarRef = useRef(null);

  const handleDatesSet = (info) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const currentDate = calendarApi.getDate();
      const monthNumber = currentDate.getMonth() + 1;
      const yearNumber = currentDate.getFullYear();
      onMonthChange({ month: monthNumber, year: yearNumber });
    }
  };

  const handleDateClick = (arg) => {
    onDayClick(arg.date);
  };


  return (
    <div>
      <Fullcalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        weekends={false}
        datesSet={handleDatesSet}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default Calendar;