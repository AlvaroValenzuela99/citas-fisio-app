import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';

export default function Gracias() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idCita = queryParams.get('idCita');
  return (
    <div className='App'>
        <h1 className='title'>Clínica de Fisioterapia Álvaro Valenzuela</h1>
        <div className='container'>
            <h2>¡Gracias por reservar una cita con nosotros!</h2>
            <h3>Acabas de dar el primer paso para lograr una salud plena.</h3>
            {idCita && <p className='gracias-id'>El ID de tu cita es el <span className='id-cita'>{idCita}</span></p>}
            <p>(Recuerda apuntarlo por si necesitas cambiarla o cancelarla en un futuro)</p>
            
        </div>
    </div>
  )
}
