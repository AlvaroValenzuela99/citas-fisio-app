package alvarovalenzuela.backend.dao;

import alvarovalenzuela.backend.entity.Horario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HorarioRepository extends JpaRepository<Horario, Integer> {

    // that's it ... no need to write any code LOL!
}
