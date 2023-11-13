package alvarovalenzuela.backend.rest;

import alvarovalenzuela.backend.service.CitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/paciente")
public class CitaController {

    private final CitaService citaService;

    @Autowired
    public CitaController(CitaService citaService){
        this.citaService = citaService;
    }

    @PostMapping("/reservar/{citaId}")
    public ResponseEntity<String> reservarCita(@PathVariable int citaId) {
        try {
            citaService.reservarCita(citaId);
            return ResponseEntity.ok("Cita reservada exitosamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
