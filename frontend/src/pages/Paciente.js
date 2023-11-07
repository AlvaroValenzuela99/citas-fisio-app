import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


export default function Paciente() {
  return (
    <div className='App'>
      <h1 className='title'>Clínica de Fisioterapia Álvaro Valenzuela</h1>
      <div className='container'>
        <Link to="/paciente/reservar" className='reservar-btn'>Reservar Cita</Link>
        <Link to="/paciente/cambiar-cita" className='cambiar-btn'>Cambiar Cita</Link>
      </div>
    </div>
  )
}
