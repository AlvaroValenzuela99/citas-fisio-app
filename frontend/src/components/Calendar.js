import React from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {
  return (
    <div>
        <Fullcalendar 
        plugins={[dayGridPlugin, interactionPlugin]} 
        initialView={'dayGridMonth'}
        />
    </div>
  );
}
