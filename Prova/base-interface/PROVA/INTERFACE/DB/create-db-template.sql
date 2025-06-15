CREATE DATABASE catalogo_biblioteca;
use catalogo_biblioteca;

create table bibliotecario(
    id BIGINT primary key AUTO_INCREMENT unique,
    nome VARCHAR (255) not null,
    email VARCHAR (255) not NULL
);

create table livro(
    id BIGINT primary key AUTO_INCREMENT unique,
    titulo VARCHAR (255) not null,
    autor VARCHAR (255) not NULL,
    genero ENUM ('ROMANCE','FICCAO_CIENTIFICA','FANTASIA','TERROR','SUSPENSE','AVENTURA','DRAMA','COMEDIA','POESIA','BIOGRAFIA','AUTOBIOGRAFIA','ENSAIO','CONTO','CRONICA'),
    status enum ('DISPONÍVEL', 'EMPRESTADO', 'RESERVADO'),
    data_cadastro date,
    bibliotecario bigint,
    Foreign Key (bibliotecario) REFERENCES bibliotecario(id)
);

