package PROVA.model;

public enum StatusLivro {
    DISPONIVEL ("Disponível"),
    EMPRESTADO ("Emprestado"),
    RESERVADO ("Reservado");

    private final String status;

    StatusLivro(String status){
        this.status = status;
    }

     public String getStatus (){
        return status;
     }
}
