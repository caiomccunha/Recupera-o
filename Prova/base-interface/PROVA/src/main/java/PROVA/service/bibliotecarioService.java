package PROVA.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PROVA.model.bibliotecarioModel;
import PROVA.repository.bibliotecarioRepository;

@Service
public class bibliotecarioService {
    @Autowired
    private bibliotecarioRepository repository;

    public List <bibliotecarioModel> listarBibliotecarios(){
        return repository.findAll();
    }

    public Optional <bibliotecarioModel> buscarPorID(Long id){
        return repository.findById(id);
    }

    public bibliotecarioModel adicionarBibliotecario(bibliotecarioModel bibliotecario){
        return repository.save(bibliotecario);
    }

    public void removerBibliotecario (Long id){
        repository.deleteById(id);
    }
}
