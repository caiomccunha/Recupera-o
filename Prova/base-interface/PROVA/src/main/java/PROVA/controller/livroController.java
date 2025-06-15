package PROVA.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PROVA.model.GeneroLivro;
import PROVA.model.StatusLivro;
import PROVA.model.livrosModel;
import PROVA.service.livrosService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping ("api/livros")
public class livroController {
    @Autowired
    private livrosService service;

    @GetMapping
    public List<livrosModel> listarLivros(){
        return service.listarLivros();
    }

    @GetMapping ("/{id}")
    public ResponseEntity <livrosModel> buscarPorId(@PathVariable Long id){
        return service.buscarPorID(id).map(ResponseEntity :: ok).orElse(ResponseEntity.notFound().build());
    }

      @GetMapping ("/filtrar/bibliotecario/{id}")
            public ResponseEntity <List <livrosModel>> filtrar(
             @PathVariable Long id){
                 List <livrosModel> result;

            if(id != null){
                result = service.listarPorBibliotecario(id);
            }else {
                result = service.listarLivros();
            }

            return result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
        }

        @GetMapping ("/generos")
        public GeneroLivro[] listarGeneros(){
            return GeneroLivro.values();
        }

        
        @GetMapping ("/status")
        public StatusLivro[] listarStatus(){
             return StatusLivro.values();
        }
           

    @PostMapping 
    public livrosModel adicionarLivros(@RequestBody livrosModel livros){
        return service.adicionarLivro(livros);
    }

    @PutMapping("/{id}")
    public ResponseEntity <livrosModel> editarLivros(@RequestBody livrosModel livros, @PathVariable Long id){
        if(!service.buscarPorID(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        livros.setId(id);
        return ResponseEntity.ok(service.adicionarLivro(livros));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity <Void> deletarLivros(@PathVariable Long id){
        if(!service.buscarPorID(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        service.removerLivros(id);
        return ResponseEntity.noContent().build();
    }
}
