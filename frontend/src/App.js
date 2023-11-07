import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Paciente from './pages/Paciente';
import Admin from './pages/Admin';
import Reservar from './pages/Reservar';
import CambiarCita from './pages/CambiarCita';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      {/* Ruta Home */}
        <Route path="/" element={<Home />} />

      {/* Ruta Paciente */}
        <Route path="paciente" element={<Paciente />}>
          <Route path="reservar" element={<Reservar />} />
          <Route path="cambiar-cita" element={<CambiarCita />} />
        </Route>

      {/* Ruta Admin */}
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
