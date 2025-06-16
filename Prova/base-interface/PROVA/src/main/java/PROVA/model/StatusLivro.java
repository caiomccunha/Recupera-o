package PROVA.model;

public enum StatusLivro {
    DISPONÍVEL ("Disponível"),
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
