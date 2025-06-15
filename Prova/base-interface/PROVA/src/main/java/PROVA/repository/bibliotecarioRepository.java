package PROVA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PROVA.model.bibliotecarioModel;

@Repository
public interface bibliotecarioRepository extends JpaRepository <bibliotecarioModel, Long> {
}
