import './App.css';
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom';
import Paciente from './components/Paciente';
import Admin from './components/Admin';

function App() {
  return (
      <div className="App">
        <h1 className='title'>Clínica de Fisioterapia Álvaro Valenzuela</h1>
        <div className='container'>
          <Link to='/paciente' className='patient-btn'>Paciente</Link>
          <Link to='/admin' className='admin-btn'>Admin</Link>
        </div>
      </div>
  );
}

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/paciente/*" element={<Paciente />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
