package alvarovalenzuela.backend.dao;

import alvarovalenzuela.backend.entity.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CitaRepository extends JpaRepository<Cita, Integer> {

    List<Cita> findByDisponible(boolean disponible);

    @Query("SELECT c FROM Cita c WHERE YEAR(c.fechaCita) = :anio AND MONTH(c.fechaCita) = :mes")
    List<Cita> obtenerCitasParaMes(@Param("anio") int anio, @Param("mes") int mes);

}
