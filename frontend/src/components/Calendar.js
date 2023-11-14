import React, { useState, useEffect, useRef } from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = ({ onMonthChange }) => {

  const [currentMonth, setCurrentMonth] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    // Notificar al componente principal sobre el cambio de mes
    if (currentMonth !== null) {
      onMonthChange(currentMonth);
    }
  }, [currentMonth, onMonthChange]);

  const handleViewDidMount = (info) => {
    // Obtener el número del mes cuando el componente de calendario se monta
    const monthNumber = new Date(info.view.currentStart).getMonth() + 1;
    setCurrentMonth(monthNumber);
  };

  return (
    <div>
        <Fullcalendar 
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]} 
        initialView={'dayGridMonth'}
        viewDidMount={handleViewDidMount}
        />
    </div>
  );
}
export default Calendar;