package PROVA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PROVA.model.livrosModel;

@Repository
public interface livrosRespository  extends JpaRepository <livrosModel, Long>{
    List <livrosModel> findByBibliotecario_id(Long id);
}
