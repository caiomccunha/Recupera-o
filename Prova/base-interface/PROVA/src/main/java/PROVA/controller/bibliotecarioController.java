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

import PROVA.model.bibliotecarioModel;
import PROVA.service.bibliotecarioService;

@RestController
@CrossOrigin (origins = "*")
@RequestMapping ("/api/bibliotecario")

public class bibliotecarioController {
        @Autowired
        private bibliotecarioService service;

        @GetMapping
        public List <bibliotecarioModel> listaBibliotecario(){
            return service.listarBibliotecarios();
        }   

        @GetMapping ("/{id}")
        public ResponseEntity <bibliotecarioModel> buscarPorId(@PathVariable Long id){
            return service.buscarPorID(id).map(ResponseEntity :: ok).orElse(ResponseEntity.notFound().build());
        }

        @PostMapping
        public bibliotecarioModel adicionarBilbiotecario(@RequestBody bibliotecarioModel bibliotecario){
            return service.adicionarBibliotecario(bibliotecario);
        }

        @PutMapping("/{id}")
        public ResponseEntity <bibliotecarioModel> editarBibliotecario (@PathVariable Long id, @RequestBody bibliotecarioModel bibliotecario){
            if(!service.buscarPorID(id).isPresent()){
                return ResponseEntity.notFound().build();
            }
            bibliotecario.setId(id);
            return ResponseEntity.ok(service.adicionarBibliotecario(bibliotecario));
        }

        @DeleteMapping ("/{id}")
        public ResponseEntity <Void> deletarBibliotecario(@PathVariable Long id){
            if (!service.buscarPorID(id).isPresent()){
                return ResponseEntity.notFound().build();
            }
            service.removerBibliotecario(id);
            return ResponseEntity.noContent().build();
        }
}
