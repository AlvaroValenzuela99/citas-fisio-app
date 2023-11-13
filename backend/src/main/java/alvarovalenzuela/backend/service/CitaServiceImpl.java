package alvarovalenzuela.backend.service;

import alvarovalenzuela.backend.dao.CitaRepository;
import alvarovalenzuela.backend.dao.HorarioRepository;
import alvarovalenzuela.backend.entity.Cita;
import alvarovalenzuela.backend.entity.Horario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            LocalDateTime fechaInicio = LocalDateTime.of(horario.getAnio(), mes, horario.getDiaSemana(), horario.getHoraInicio().getHour(), horario.getHoraInicio().getMinute());

            while (fechaInicio.plusMinutes(60).isBefore(fechaInicio.plusHours(1))) {
                Cita cita = new Cita();
                cita.setFechaCita(fechaInicio.toLocalDate());
                cita.setHoraInicio(fechaInicio.toLocalTime());
                cita.setHoraFin(fechaInicio.plusMinutes(60).toLocalTime());
                cita.setDisponible(true); // Por defecto, está disponible al añadirse

                citasGeneradas.add(cita);

                fechaInicio = fechaInicio.plusHours(1);
            }
        }

        // Guardar las citas generadas en la base de datos
        return citaRepository.saveAll(citasGeneradas);
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



}
