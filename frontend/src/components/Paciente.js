import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import Reservar from './Reservar';
import CambiarCita from './CambiarCita';

export default function Paciente() {
  return (
    <div className="App">
        <h1 className='title'>Clínica de Fisioterapia Álvaro Valenzuela</h1>
        <div className='container'>
          <Link to='reservar' className='patient-btn'>Reservar Cita</Link>
          <Link to='cambiar-cita' className='admin-btn'>Cambiar Cita</Link>
        </div>

        <Routes>
          <Route path="reservar" element={<Reservar />} />
          <Route path="cambiar-cita" element={<CambiarCita />} />
      </Routes>
      </div>
  )
}
