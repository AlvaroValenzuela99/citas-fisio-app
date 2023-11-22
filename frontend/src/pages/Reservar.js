import React, { useState, useEffect } from 'react';
import '../App.css';
import Calendar from '../components/Calendar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Reservar() {

  const [selectedMonthYear, setSelectedMonthYear] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [citasDisponibles, setCitasDisponibles] = useState([]);
  const [citasDelDia, setCitasDelDia] = useState([]);

  
  const navigate = useNavigate();
  

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

  // Función para formatear la hora
  const formatHora = (hora) => {
    // Convertir el número en cadena y agregar un cero si es necesario
    const formattedHora = hora < 10 ? `0${hora.toString().replace('.', ',')}` : hora.toString().replace('.', ',');

    // Separar la parte entera y la parte decimal
    const [parteEntera, parteDecimal] = formattedHora.split(',');

    // Formatear la parte entera y agregar ceros a la parte decimal si es necesario
    const formattedParteEntera = parteEntera.length === 1 ? `0${parteEntera}` : parteEntera;
    
    // Obtener minutos con dos dígitos
    const minutos = parteDecimal ? `0${Math.round(Number(`0.${parteDecimal}`) * 60)}` : '00';

    return `${formattedParteEntera}:${minutos}`;
  };

  // Reservar la cita al hacer submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = event.target.elements.nombre.value;
    const apellidos = event.target.elements.apellidos.value;
    const telefono = event.target.elements.telefono.value;
    const citaSeleccionada = event.target.elements.citaSeleccionada.value;

    // Aquí también necesitas obtener el valor del radio button seleccionado, si es necesario

    try {
      // Realizar la solicitud PUT al backend
      const response = await axios.put(`/api/citas/reservar/${citaSeleccionada}`, {
        nombre,
        apellidos,
        telefono,
    
      });

      // Manejar la respuesta del backend según tus necesidades
      console.log('Respuesta del servidor:', response.data);

      // Redireccionar a la página de agradecimiento
      navigate(`/paciente/gracias?idCita=${citaSeleccionada}`);
    } catch (error) {
      console.error('Error al enviar la solicitud al backend:', error);
    }
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
          
            <form className='formulario-reserva' onSubmit={handleSubmit}>

              <div className='datos-paciente'>
                <label>Nombre:</label>
                <input type='text' placeholder='Nombre' name='nombre'></input>

                <label>Apellidos:</label>
                <input type='text' placeholder='Apellidos' name='apellidos'></input>

                <label>Teléfono:</label>
                <input type='tel' placeholder='Teléfono' name='telefono'></input>  
              </div>

                {/* Mostrar las citas del día solo al hacer clic */}
                {citasDelDia.length > 0 && (
                  <div className='citas-disponibles'>
                    {citasDelDia.map(cita => (
                      <div key={cita.id}>
                        <input
                          type='radio'
                          id={`cita-${cita.id}`}
                          name='citaSeleccionada'
                          value={cita.id}
                          // Puedes manejar la lógica de selección aquí según tus necesidades
                        />
                        <label htmlFor={`cita-${cita.id}`}>
                          {formatHora(cita.horaInicio)} a {formatHora(cita.horaFin)}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              <button className='btn-reservar' type='submit'>Reservar Cita</button>
            </form>

        </div>

      </div>
    </div>
  )
}
