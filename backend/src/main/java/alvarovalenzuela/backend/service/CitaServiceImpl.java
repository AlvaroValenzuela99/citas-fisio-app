package alvarovalenzuela.backend.service;

import alvarovalenzuela.backend.dao.CitaRepository;
import alvarovalenzuela.backend.entity.Cita;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CitaServiceImpl implements CitaService{

    private CitaRepository citaRepository;

    @Autowired
    public CitaServiceImpl(CitaRepository laCitaRepository){
        citaRepository = laCitaRepository;
    }


    @Override
    public List<Cita> findAll() {
        return citaRepository.findAll();
    }

    @Override
    public Cita findById(int theId) {
        Optional<Cita> result = citaRepository.findById(theId);

        Cita cita = null;

        if(result.isPresent()){
            cita = result.get();
        }else{
            // no se ha encontrado la cita
            throw new RuntimeException("No se ha encontrado la cita id - " + theId);
        }

        return cita;
    }

    @Override
    public Cita save(Cita cita) {
    return citaRepository.save(cita);
    }

    @Override
    public void deleteById(int theId) {
        citaRepository.deleteById(theId);
    }
}
