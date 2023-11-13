package alvarovalenzuela.backend.dao;

import alvarovalenzuela.backend.entity.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HorarioRepository extends JpaRepository<Horario, Integer> {

    List<Horario> obtenerHorariosDisponiblesParaMes(@Param("mes") int mes);

}
