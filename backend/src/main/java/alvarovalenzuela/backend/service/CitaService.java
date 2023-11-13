package alvarovalenzuela.backend.service;

import alvarovalenzuela.backend.entity.Cita;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CitaService {

    List<Cita> findAll();

    Cita findById(int theId);

    Cita save(Cita cita);

    void deleteById(int theId);

    List<Cita> generarCitasDisponiblesParaMes(int mes);

    void reservarCita(int citaId);

}
