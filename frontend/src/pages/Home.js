import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <div className='App'>
        <h1 className='title'>Clínica de Fisioterapia Álvaro Valenzuela</h1>
        <div className='container'>
            <Link to='/paciente' className='patient-btn'>Ir a Paciente</Link>
            <Link to='/admin' className='admin-btn'>Ir a Admin</Link>
      </div>
    </div>
  )
}
