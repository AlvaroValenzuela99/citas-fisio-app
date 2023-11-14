import React, { useState, useEffect } from 'react';
import '../App.css';
import Calendar from '../components/Calendar'
import axios from 'axios';

export default function Reservar() {

  const [selectedMonth, setSelectedMonth] = useState(1); // Mes inicial
  const [citasDisponibles, setCitasDisponibles] = useState([]);


  useEffect(() => {
    // Hacer una solicitud al backend para obtener las citas disponibles
    axios.get(`/api/citas/${selectedMonth}`)
      .then(response => {
        setCitasDisponibles(response.data);
      })
      .catch(error => {
        console.error('Error al obtener citas disponibles:', error);
      });
  }, [selectedMonth]);  // Este efecto se ejecutará solo una vez que selectedMonth cambie

  return (
    <div className='App'>
      <h1 className='title'>Clínica de Fisioterapia Álvaro Valenzuela</h1>
      <div className='container'>
        <p>¡Aquí puedes reservar tu cita!</p>

        <Calendar onMonthChange={setSelectedMonth} />

        <ul>
          {citasDisponibles.map(cita => (
            <li key = {cita.id}>
              {cita.fechaCita} - {cita.horaInicio} a {cita.horaFin}
            </li>
          ))}
        </ul>

        
      </div>   
    </div>
  )
}
