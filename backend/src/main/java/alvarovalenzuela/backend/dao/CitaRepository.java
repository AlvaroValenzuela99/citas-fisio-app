package alvarovalenzuela.backend.dao;

import alvarovalenzuela.backend.entity.Cita;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CitaRepository extends JpaRepository<Cita, Integer> {

    // that's it ... no need to write any code LOL!
}
