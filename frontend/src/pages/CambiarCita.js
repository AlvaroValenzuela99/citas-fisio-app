import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

export default function CambiarCita() {
  const [idCita, setIdCita] = useState(null);
  const [cita, setCita] = useState(null);
  const [mensajeError, setMensajeError] = useState('');

  const handleBusquedaCita = async (event) => {
    event.preventDefault();
    
    const idCita = event.target.elements.idCita.value;
    

    try{
      // enviar solicitud al backend para obtener la cita
      const response = await axios.get(`/api/citas/cita/${idCita}`);

      console.log('Respuesta del servidor:', response.data);

      const citaData = response.data;

      if (!citaData || citaData.disponible) {
        setIdCita(null); // Resetear el ID en caso de error
        setCita(null);
        setMensajeError('No hay citas reservadas con ese ID.');
      } else {
        setIdCita(idCita);
        setCita(citaData);
        setMensajeError(''); // Limpiar los mensajes de error previos
      }

    }catch(error){
      console.error('Error al enviar la solicitud al backend:', error);
      setIdCita(null); // Resetear el ID en caso de error
      setCita(null);
      setMensajeError('No hay citas reservadas con ese ID.');
    }
  }

  const handleCambioCita = async (event) => {
    event.preventDefault();
    // Obtener los valores del formulario
    const nombre = event.target.elements.nombre.value;
    const apellidos = event.target.elements.apellidos.value;
    const telefono = event.target.elements.telefono.value;

    try{

      const response = await axios.put(`/api/citas/reservar/${idCita}`, {
        nombre,
        apellidos,
        telefono,
      });

      console.log('Respuesta del servidor:', response.data);

    }catch(error){
      console.error('Error al enviar la solicitud al backend:', error);
    }
  }

  const handleCancelarCita = async (event) => {
    try {
      // Elimina la cita estableciendo nombre, apellidos y telefono como null y disponible como true
      const response = await axios.put(`/api/citas/cancelarcita/${idCita}`, {
        nombre: null,
        apellidos: null,
        telefono: null,
        disponible: true,
      });

      console.log('Respuesta del servidor:', response.data);

    } catch (error) {
      console.error('Error al enviar la solicitud al backend:', error);
    }
  }

    // Determina si mostrar el segundo formulario basado en si hay un ID de cita almacenado
    const mostrarSegundoFormulario = idCita !== null;

  return (
    <div className='App'>
      <h1 className='title'>Clínica de Fisioterapia Álvaro Valenzuela</h1>
      <div className='container'>
        <div className='texto-cabecera'>
          <p className='cto-titulo'>¡Aquí puedes cambiar/eliminar tu cita!</p>
          <p>Introduce aquí debajo el ID de tu cita:</p>
        </div>
          <form onSubmit={handleBusquedaCita}>
            <input type='text' placeholder='ID de la cita' name='idCita' required></input>
            <button type='submit'>Buscar cita</button>
          </form>

          {/* Muestra el segundo formulario solo si hay un ID de cita almacenado */}
          {mostrarSegundoFormulario ? (
            <div>  
              <form onSubmit={handleCambioCita}>

              <div className='datos-paciente'>
                <label>Nombre:</label>
                <input type='text' placeholder='Nombre' name='nombre' defaultValue={cita.nombre} required></input>

                <label>Apellidos:</label>
                <input type='text' placeholder='Apellidos' name='apellidos' defaultValue={cita.apellidos} required></input>

                <label>Teléfono:</label>
                <input type='tel' 
                    placeholder='Teléfono' 
                    name='telefono' 
                    onKeyPress={(e) => {
                        // Permite solo números y teclas especiales (por ejemplo, retroceso)
                        if (!/[\d\b]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      maxLength='9'
                      defaultValue={cita.telefono}
                    required></input> 
              </div>

              <button type='submit'>Actualizar cita</button>

              </form>

              <div className='actualizar-cancelar'>
                    <button onClick={handleCancelarCita}>Cancelar Cita</button>
              </div>
            
          </div>
          ) : (
            <p>{mensajeError}</p>
          )}
        
      </div>
    </div>
  )
}
