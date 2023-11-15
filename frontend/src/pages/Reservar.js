import React, { useState, useEffect } from 'react';
import '../App.css';
import Calendar from '../components/Calendar'
import axios from 'axios';

export default function Reservar() {

  const [selectedMonthYear, setSelectedMonthYear] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [citasDisponibles, setCitasDisponibles] = useState([]);
  const [citasDelDia, setCitasDelDia] = useState([]);
  

  useEffect(() => {
    // Hacer una solicitud al backend para obtener las citas disponibles
    axios.get(`/api/citas/${selectedMonthYear.year}/${selectedMonthYear.month}`)
      .then(response => {
        setCitasDisponibles(response.data);
      })
      .catch(error => {
        console.error('Error al obtener citas disponibles:', error);
      });

    // Limpiar las citas del día al cambiar de mes
    setCitasDelDia([]);
  }, [selectedMonthYear]);


  const handleDayClick = (date) => {
    // Filtrar las citas para el día seleccionado
    const citasDelDia = citasDisponibles.filter(
      (cita) => new Date(cita.fechaCita).toDateString() === new Date(date).toDateString() && cita.disponible
      );
    setCitasDelDia(citasDelDia);
  };

  

  return (
    <div className='App'>
      <h1 className='title'>Clínica de Fisioterapia Álvaro Valenzuela</h1>
      <div className='container'>
      <p>¡Aquí puedes reservar tu cita!</p>
        <div className='reservas'>
          
          <div className='calendario'>
            <Calendar onMonthChange={setSelectedMonthYear} onDayClick={handleDayClick} />
          </div>
          
          {/* Mostrar las citas del día solo al hacer clic */}
          {citasDelDia.length > 0 && (
            <div className='citas-disponibles'>
            <ul>
              {citasDelDia.map(cita => (
                <li key={cita.id}>
                {cita.horaInicio} a {cita.horaFin}
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>

      </div>
    </div>
  )
}
