package alvarovalenzuela.backend.rest;

import alvarovalenzuela.backend.entity.Cita;
import alvarovalenzuela.backend.service.AuthService;
import alvarovalenzuela.backend.service.CitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    // Obtener citas por ID
    @GetMapping("/cita/{idCita}")
    public Cita obtenerCita(@PathVariable int idCita){

        Cita cita = citaService.findById(idCita);

        return cita;
    }


    // Crear nuevas citas a partir de horarios. Si ya existen, mostrarlas.
    // Esto va a permitir añadir dinámicamente nuevos horarios, y que se creen citas nuevas para otros meses automáticamente,
    // al hacer la primera petición
    @GetMapping("/{anio}/{mes}")
    public ResponseEntity<List<Cita>> getCitasDisponibles(@PathVariable int anio, @PathVariable int mes) {
        try {
            // Verificar si ya hay citas generadas para este mes
            List<Cita> citasExistentes = citaService.obtenerCitasParaMes(anio, mes);

            if (citasExistentes.isEmpty()) {
                // Si no hay citas existentes, genera las citas para el mes proporcionado
                List<Cita> citasGeneradas = citaService.generarCitasDisponiblesParaMes(anio, mes);

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


    // Endpoint para actualizar una cita existente
   @PutMapping("/reservar/{idCita}")
    public ResponseEntity<Cita> actualizarCita(@PathVariable int idCita, @RequestBody Cita datosCita){
        try {
            // Obtener la cita existente por ID
            Cita citaExistente = citaService.findById(idCita);

            if (citaExistente != null) {
                // Actualizar la cita existente con los nuevos valores
                citaExistente.setNombre(datosCita.getNombre());
                citaExistente.setApellidos(datosCita.getApellidos());
                citaExistente.setTelefono(datosCita.getTelefono());
                citaExistente.setDisponible(false); // Cambiar "disponible" a false

                // Guardar la cita actualizada en la base de datos
                Cita citaActualizada = citaService.save(citaExistente);

                return ResponseEntity.ok(citaActualizada);
            } else {
                // La cita no existe
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Endpoint para "cancelar" una cita, es decir, devolverla a disponibilidad true
    @PutMapping("/cancelarcita/{idCita}")
    public ResponseEntity<Cita> cancelarCita(@PathVariable int idCita){
        try {
            // Obtener la cita existente por ID
            Cita citaExistente = citaService.findById(idCita);

            if (citaExistente != null) {
                // Devolver la cita a disponible y sin valores
                citaExistente.setNombre(null);
                citaExistente.setApellidos(null);
                citaExistente.setTelefono(null);
                citaExistente.setDisponible(true); // Cambiar "disponible" a true

                // Guardar la cita actualizada en la base de datos
                Cita citaActualizada = citaService.save(citaExistente);

                return ResponseEntity.ok(citaActualizada);
            } else {
                // La cita no existe
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (authService.authenticate(username, password)) {
            // Autenticación exitosa
            // Puedes generar un token JWT y devolverlo al cliente, por ejemplo
            // O simplemente devolver un mensaje de éxito
            return ResponseEntity.ok("Autenticación exitosa");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }
}
