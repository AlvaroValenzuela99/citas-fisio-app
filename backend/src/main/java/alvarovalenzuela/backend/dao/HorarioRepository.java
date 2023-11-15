package alvarovalenzuela.backend.dao;

import alvarovalenzuela.backend.entity.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HorarioRepository extends JpaRepository<Horario, Integer> {

    @Query("SELECT h FROM Horario h WHERE h.diaSemana = :diaSemana AND h.disponible = true")
    List<Horario> obtenerHorariosDisponiblesParaDiaSemana(@Param("diaSemana") int diaSemana);

}
