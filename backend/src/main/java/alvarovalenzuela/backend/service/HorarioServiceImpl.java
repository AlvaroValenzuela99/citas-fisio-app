package alvarovalenzuela.backend.service;

import alvarovalenzuela.backend.dao.HorarioRepository;
import alvarovalenzuela.backend.entity.Horario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HorarioServiceImpl implements HorarioService{

    private HorarioRepository horarioRepository;

    @Autowired
    public HorarioServiceImpl(HorarioRepository elHorarioRepository){
        horarioRepository = elHorarioRepository;
    }


    @Override
    public List<Horario> findAll() {
        return horarioRepository.findAll();
    }

    @Override
    public Horario findById(int theId) {
        return horarioRepository.findById(theId)
                .orElseThrow(() -> new RuntimeException("No se ha encontrado el horario id - " + theId));
    }

    @Override
    public Horario save(Horario horario) {
        return horarioRepository.save(horario);
    }

    @Override
    public void deleteById(int theId) {
        horarioRepository.deleteById(theId);
    }
}
