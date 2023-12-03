import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {

  const [citasReservadas, setCitasReservadas] = useState([]);

  useEffect(() => {
    axios.get('/api/citas/nodisponibles')
      .then(response => {
        setCitasReservadas(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las citas reservadas:', error);
      })
  }, []);

  // Obtener la fecha actual en formato de array [año, mes, día]
  // const fechaActualArray = new Date().toLocaleDateString().split('/').map(Number);


  // Filtrar citas para obtener solo las del día actual
  /*
  const citasDeHoy = citasReservadas.filter(cita => {
    return (
      cita.fecha[0] === fechaActualArray[2] && // año
      cita.fecha[1] === fechaActualArray[1] && // mes
      cita.fecha[2] === fechaActualArray[0]    // día
    );
  });
  */
   // Fecha a simular: 1 de diciembre de 2023
   const fechaSimulada = [2023, 12, 1];

   // Filtrar citas para obtener solo las del día simulado
   const citasDelDiaSimulado = citasReservadas.filter(cita => {
     return (
       cita.fechaCita[0] === fechaSimulada[0] &&
       cita.fechaCita[1] === fechaSimulada[1] &&
       cita.fechaCita[2] === fechaSimulada[2]
     );
   });
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
                  <th>Telefono</th>
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
          <div className='cuadro-todas'>citas futuro</div>
        </div>
      </div>
    </div>
  )
}
