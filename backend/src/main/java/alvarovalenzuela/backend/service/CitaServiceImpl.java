package alvarovalenzuela.backend.service;

import alvarovalenzuela.backend.dao.CitaRepository;
import alvarovalenzuela.backend.dao.HorarioRepository;
import alvarovalenzuela.backend.entity.Cita;
import alvarovalenzuela.backend.entity.Horario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Service
public class CitaServiceImpl implements CitaService{

    private CitaRepository citaRepository;
    private HorarioRepository horarioRepository;

    @Autowired
    public CitaServiceImpl(CitaRepository laCitaRepository, HorarioRepository elHorarioRepository){
        citaRepository = laCitaRepository;
        horarioRepository = elHorarioRepository;
    }


    @Override
    public List<Cita> findAll() {
        return citaRepository.findAll();
    }

    @Override
    public Cita findById(int theId) {
        return citaRepository.findById(theId)
                .orElseThrow(() -> new RuntimeException("No se ha encontrado la cita id - " + theId));
    }

    @Override
    public Cita save(Cita cita) {
    return citaRepository.save(cita);
    }

    @Override
    public void deleteById(int theId) {
        citaRepository.deleteById(theId);
    }

    @Override
    public List<Cita> generarCitasDisponiblesParaMes(int anio, int mes) {
        List<Cita> citasGeneradas = new ArrayList<>();

        for (int dia = 1; dia <= obtenerUltimoDiaDelMes(anio, mes); dia++) {
            // Obtener el día de la semana para la fecha actual
            LocalDate fechaActual = LocalDate.of(anio, mes, dia);
            DayOfWeek diaSemana = fechaActual.getDayOfWeek();

            // Obtener los horarios disponibles para el día de la semana actual
            List<Horario> horariosDisponibles = horarioRepository.obtenerHorariosDisponiblesParaDiaSemana(diaSemana.getValue());

            for (Horario horario : horariosDisponibles) {
                LocalDateTime fechaInicio = LocalDateTime.of(anio, mes, dia, horario.getHoraInicio().getHour(), horario.getHoraInicio().getMinute());

                // Iterar desde la hora de inicio hasta la hora de fin
                while (fechaInicio.toLocalTime().isBefore(horario.getHoraFin())) {
                    // Verificar que la fecha de inicio esté dentro del rango de horaInicio a horaFin
                    if (!fechaInicio.toLocalTime().isBefore(horario.getHoraInicio())) {
                        Cita cita = new Cita();
                        cita.setFechaCita(fechaInicio.toLocalDate());
                        cita.setHoraInicio(fechaInicio.toLocalTime());
                        cita.setHoraFin(fechaInicio.plusMinutes(60).toLocalTime());
                        cita.setDisponible(true); // Por defecto, está disponible al añadirse

                        citasGeneradas.add(cita);
                    }

                    fechaInicio = fechaInicio.plusHours(1);
                }
            }
        }

        // Guardar las citas generadas en la base de datos
        return citaRepository.saveAll(citasGeneradas);
    }

    // Método para obtener el último día del mes
    private int obtenerUltimoDiaDelMes(int anio, int mes) {
        YearMonth yearMonthObject = YearMonth.of(anio, mes);
        return yearMonthObject.lengthOfMonth();
    }

    @Override
    public List<Cita> obtenerCitasParaMes(int anio, int mes) {
        return citaRepository.obtenerCitasParaMes(anio, mes);
    }

    public void reservarCita(int theId) {
        Cita cita = citaRepository.findById(theId)
                .orElseThrow(() -> new RuntimeException("No se ha encontrado la cita id - " + theId));

        if (cita.isDisponible()) {
            cita.setDisponible(false);
            citaRepository.save(cita);
        } else {
            throw new RuntimeException("La cita ya ha sido reservada.");
        }
    }

    @Override
    public List<Cita> obtenerCitasDisponibles() {
        return citaRepository.findByDisponible(true);
    }

    @Override
    public List<Cita> obtenerCitasNoDisponibles(){
        return citaRepository.findByDisponible(false);
    }


}
