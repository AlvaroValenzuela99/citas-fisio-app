package alvarovalenzuela.backend.service;

import alvarovalenzuela.backend.entity.Cita;

import java.util.List;

public interface CitaService {

    List<Cita> findAll();

    Cita findById(int theId);

    Cita save(Cita cita);

    void deleteById(int theId);

}
