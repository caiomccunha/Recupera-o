package PROVA.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import PROVA.model.livrosModel;
import PROVA.repository.livrosRespository;

@Service
public class livrosService {
    @Autowired
    private livrosRespository respository;

    public List<livrosModel> listarLivros(){
        return respository.findAll();
    }

    public Optional <livrosModel> buscarPorID (Long id){
        return respository.findById(id);
    }

    public List <livrosModel> listarPorBibliotecario(Long id){
       return respository.findByBibliotecario_id(id);
    }

    public livrosModel adicionarLivro (livrosModel livros){
        return respository.save(livros);
    }

    public void removerLivros(Long id){
        respository.deleteById(id);
    }
}
