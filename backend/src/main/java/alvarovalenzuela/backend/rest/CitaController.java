package alvarovalenzuela.backend.rest;

import alvarovalenzuela.backend.entity.Cita;
import alvarovalenzuela.backend.service.CitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
public class CitaController {

    private final CitaService citaService;

    @Autowired
    public CitaController(CitaService citaService){
        this.citaService = citaService;
    }

    // mostrar citas disponibles = true
    @GetMapping("/disponibles")
    public List<Cita> mostrarDisponibles() {
        return citaService.obtenerCitasDisponibles();
    }

    // mostrar citas disponibles = false
    @GetMapping("/nodisponibles")
    public List<Cita> mostrarNoDisponibles(){
        return citaService.obtenerCitasNoDisponibles();
    }

    // Crear nuevas citas a partir de horarios. Si ya existen, mostrarlas
    // esto va a permitir añadir dinámicamente nuevos horarios, y que se creen citas nuevas para otros meses automáticamente,
    // al hacer la primera petición
    @GetMapping("/{mes}")
    public ResponseEntity<List<Cita>> getCitasDisponiblesParaMes(@PathVariable int mes) {
        try {
            // Verificar si ya hay citas generadas para este mes
            List<Cita> citasExistentes = citaService.obtenerCitasParaMes(mes);

            if (citasExistentes.isEmpty()) {
                // Si no hay citas existentes, genera las citas para el mes proporcionado
                List<Cita> citasGeneradas = citaService.generarCitasDisponiblesParaMes(mes);

                // Puedes devolver solo las citas generadas o combinarlas con las existentes según sea necesario
                return ResponseEntity.ok(citasGeneradas);
            } else {
                // Si ya hay citas generadas, simplemente devuélvelas
                return ResponseEntity.ok(citasExistentes);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
