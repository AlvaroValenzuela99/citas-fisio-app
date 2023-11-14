package alvarovalenzuela.backend.service;

import alvarovalenzuela.backend.dao.CitaRepository;
import alvarovalenzuela.backend.dao.HorarioRepository;
import alvarovalenzuela.backend.entity.Cita;
import alvarovalenzuela.backend.entity.Horario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public List<Cita> generarCitasDisponiblesParaMes(int mes) {
        List<Horario> horariosDisponibles = horarioRepository.obtenerHorariosDisponiblesParaMes(mes);
        List<Cita> citasGeneradas = new ArrayList<>();

        for (Horario horario : horariosDisponibles) {
            LocalDateTime fechaInicio = LocalDateTime.of(horario.getAnio(), mes, 1, horario.getHoraInicio().getHour(), horario.getHoraInicio().getMinute());

            while (fechaInicio.getMonthValue() == mes) {
                // Verificar que la fecha de inicio esté dentro del rango de horaInicio a horaFin
                // y que el día no sea sábado ni domingo
                if (!fechaInicio.toLocalTime().isBefore(horario.getHoraInicio())
                        && fechaInicio.toLocalTime().isBefore(horario.getHoraFin())
                        && (fechaInicio.getDayOfWeek() != DayOfWeek.SATURDAY && fechaInicio.getDayOfWeek() != DayOfWeek.SUNDAY)) {
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

        // Guardar las citas generadas en la base de datos
        return citaRepository.saveAll(citasGeneradas);
    }

    @Override
    public List<Cita> obtenerCitasParaMes(int mes) {
        return citaRepository.obtenerCitasParaMes(mes);
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
