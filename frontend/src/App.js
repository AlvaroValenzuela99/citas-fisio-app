import './App.css';
import AdminButton from './components/AdminButton';
import PatientButton from './components/PatientButton';

function App() {
  return (
    <div className="App">
      <h1 className='title'>Clínica de Fisioterapia Álvaro Valenzuela</h1>
      <div className='container'>
        <PatientButton/>
        <AdminButton/>
      </div>
    </div>
  );
}

export default App;
