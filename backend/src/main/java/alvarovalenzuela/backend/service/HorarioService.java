package alvarovalenzuela.backend.service;

import alvarovalenzuela.backend.entity.Horario;

import java.util.List;

public interface HorarioService {

    List<Horario> findAll();

    Horario findById(int theId);

    Horario save(Horario horario);

    void deleteById(int theId);

}
