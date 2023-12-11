import React, { useState } from 'react';
import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Paciente from './pages/Paciente';
import Admin from './pages/Admin';
import Reservar from './pages/Reservar';
import CambiarCita from './pages/CambiarCita';
import Gracias from './pages/Gracias';
import LoginForm from './components/LoginForm';

function App() {

  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    // Puedes implementar la lógica para cerrar sesión, si es necesario
    setAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
      {/* Ruta Home */}
        <Route path="/" element={<Home />} />

      {/* Ruta Paciente */}
        <Route path="/paciente" element={<Paciente />}/>
        <Route path="/paciente/reservar" element={<Reservar />} />
        <Route path="/paciente/cambiar-cita" element={<CambiarCita />} />
        <Route path="/paciente/gracias" element={<Gracias />} />
        

        {/* Ruta Admin (protegida con LoginForm) */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Admin handleLogout={handleLogout} />
            ) : (
              <LoginForm handleLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
