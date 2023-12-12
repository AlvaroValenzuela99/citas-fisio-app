import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {

  const [citasReservadas, setCitasReservadas] = useState([]);
  const [citasDelDiaSimulado, setCitasDelDiaSimulado] = useState([]);

  useEffect(() => {
    const cargarCitasReservadas = async () => {
      try {
        const response = await axios.get('/api/citas/nodisponibles');
        setCitasReservadas(response.data);

        // Obtener la fecha actual en formato de array [año, mes, día]
        const fechaActualArray = new Date().toLocaleDateString().split('/').map(Number);

        const citasDelDia = response.data.filter(cita => (
          cita.fechaCita[0] === fechaActualArray[2] &&
          cita.fechaCita[1] === fechaActualArray[1] &&
          cita.fechaCita[2] === fechaActualArray[0]
        ));
        setCitasDelDiaSimulado(citasDelDia);
      } catch (error) {
        console.error('Error al obtener las citas reservadas:', error);
      }
    };

    cargarCitasReservadas();
  }, []); // Solo se ejecuta al montar el componente

  const handleCancelarCita = async (idCita) => {
    try {
      // Lógica para cancelar la cita en el backend
      await axios.put(`/api/citas/cancelarcita/${idCita}`, {
        nombre: null,
        apellidos: null,
        telefono: null,
        disponible: true,
      });
  
      console.log('Cita cancelada con éxito');
  
      // Actualizar el estado después de cancelar la cita
      setCitasReservadas(prevCitas => prevCitas.filter(cita => cita.id !== idCita));
      setCitasDelDiaSimulado(prevCitas => prevCitas.filter(cita => cita.id !== idCita))
    } catch (error) {
      console.error('Error al enviar la solicitud al backend:', error);
    }
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

    // Funcion para formatear la fecha
    const formatFecha = (fechaCita) => {
      const [anio, mes, dia] = fechaCita;
      return `${anio}/${mes}/${dia}`;
    }

  return (
    <div className='App'>
      <h1 className='title'>Clínica de Fisioterapia Álvaro Valenzuela</h1>
      <div className='container-admin'>
        <div className='texto-cabecera'>
          <p className='cto-cabecera'>Panel de Administración</p>
        </div>

        <div className='panel'>
          <div className='cuadro-hoy'>
            <h3>Citas de hoy</h3>
            <table>
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {citasDelDiaSimulado.map(cita => (
                  <tr key={cita.id}>
                    <td>{formatHora(cita.horaInicio)} a {formatHora(cita.horaFin)}</td>
                    <td>{cita.nombre}</td>
                    <td>{cita.apellidos}</td>
                    <td>{cita.telefono}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='cuadro-todas'>
            <h3>Todas las citas reservadas</h3>
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Teléfono</th>
                  <th>Cancelar</th>
                </tr>
              </thead>
              <tbody>
                {citasReservadas.map(cita => (
                  <tr key={cita.id}>
                    <td>{formatFecha(cita.fechaCita)}</td>
                    <td>{formatHora(cita.horaInicio)} a {formatHora(cita.horaFin)}</td>
                    <td>{cita.nombre}</td>
                    <td>{cita.apellidos}</td>
                    <td>{cita.telefono}</td>
                    <td><button onClick={() => handleCancelarCita(cita.id)} className='cancelar-cita'>Cancelar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
