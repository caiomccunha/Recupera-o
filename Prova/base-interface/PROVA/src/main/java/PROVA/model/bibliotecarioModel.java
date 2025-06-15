package PROVA.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name = "bibliotecario")
@Getter
@Setter
@NoArgsConstructor

public class bibliotecarioModel {
    
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false, length = 150)
    private String nome;

    @Column (nullable = false, length =  300, unique = true)
    private String email;
}
