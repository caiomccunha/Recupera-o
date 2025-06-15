package PROVA.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "livros")
@Getter
@Setter
@NoArgsConstructor
public class livrosModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false, length = 255)
    private String titulo;

    @Column (nullable = false, length = 255)
    private String autor;

    @Enumerated(EnumType.STRING)
    @Column (nullable = false, length = 80)
    private GeneroLivro genero;

    @Enumerated(EnumType.STRING)
    @Column (nullable = false)
    private StatusLivro status;

    @Column (nullable = false)
    private LocalDate data_cadastro;

   @ManyToOne
    @JoinColumn (name = "bibliotecario")
    private bibliotecarioModel bibliotecario;

    
}   
