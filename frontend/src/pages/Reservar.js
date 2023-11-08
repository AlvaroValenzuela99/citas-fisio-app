import React from 'react';
import '../App.css';
import Calendar from '../components/Calendar'

export default function Reservar() {
  return (
    <div className='App'>
      <h1 className='title'>Clínica de Fisioterapia Álvaro Valenzuela</h1>
      <p>¡Aquí puedes reservar tu cita!</p>
      <Calendar />
    </div>
  )
}
