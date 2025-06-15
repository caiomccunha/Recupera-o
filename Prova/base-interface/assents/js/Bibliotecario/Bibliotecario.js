
        //API GET
    fetch('http://localhost:8080/api/bibliotecario', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      addlinha(data);
    })
    .catch(error => {
      console.log(error);
    });
    

  //Adicionar Linha na Tabela
  function addlinha(dadosAPI){
      const tabela = document.getElementById('tabelaCorpo');
      dadosAPI.forEach(element => {   
        const linha = document.createElement('tr');
        //Adicionando HTML
        linha.innerHTML = `
          <tr>
          <td class="px-4 py-2">${element.id}</td>
              <td class="px-4 py-2">${element.nome}</td>
              <td class="px-4 py-2">${element.email}</td>
              <td class="px-4 py-2"><button  class="bg-red-500 text-white px-2 py-1 rounded" onclick="remover(this,${element.id} )">remover</button>
              <button class ="bg-green-500 text-black px-2 py-1 rounded" onclick="editar(this, event,${element.id} )">editar</button></td>
          </tr>
        `;
        
        tabela.appendChild(linha);
      });
    }

    //Cadastrar Novas pessoas do formulario
    function cadastrar(){
      event.preventDefault();
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      if(nome && email){
        //Adicionando Linha com nosso Cadastro
        this.addlinha([{"nome":nome.trim(), "email":email.trim()}]);
        
        //Limpando os campos
        document.getElementById('nome').value = "";
        document.getElementById('email').value = "";

        //API POST  
        fetch('http://localhost:8080/api/bibliotecario', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"nome":nome, "email":email})
        })
        .then(response => response.json())
        .then(data => {
          console.log("Resposta da API:", data);
        })
        .catch(error => {
          console.error("Erro ao enviar dados:", error);
        });
    ''

          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Cadastro feito com sucesso'
          });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Falta dados para cadastar'
        });
      }
    }

    //Remover Alguma Linha da tabela
    function remover(dadosbotao,id){
      event.preventDefault();
  
      Swal.fire({
        icon: 'question',
        title: 'Você tem certeza?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then((result) => {
      if (result.isConfirmed){
      const nome = dadosbotao.parentElement.parentElement;
      nome.remove();
      fetch(`http://localhost:8080/api/bibliotecario/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      response.text()
      console.log(response);
    })
    .then(data => {
    console.log(id);
    console.log('Resource deleted successfully:', id);
    })
    .catch(error => {
      console.log(error);
    });
          Swal.fire('Confirmado!', '', 'success');
        } else {
          Swal.fire('Cancelado', '', 'info');
        }
      });
    }
 
 
    function editar(dadosbotao, event, id) {
  event.preventDefault();

  const linha = dadosbotao.parentElement.parentElement;
 // const id = linha.children[0].textContent.trim();
  const nomeAtual = linha.children[1].textContent.trim();
  const emailAtual = linha.children[2].textContent.trim();

  Swal.fire({
    title: 'Editar Bibliotecário',
    html:
      `<input id="swal-nome" class="swal2-input" placeholder="Nome" value="${nomeAtual}">
       <input id="swal-email" class="swal2-input" placeholder="Email" value="${emailAtual}">`,
    showCancelButton: true,
    confirmButtonText: 'Salvar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      
      const nomeNovo = document.getElementById('swal-nome').value.trim();
      const emailNovo = document.getElementById('swal-email').value.trim();

      if (nomeNovo && emailNovo) {
        const dados = { nome: nomeNovo, email: emailNovo };

        fetch(`http://localhost:8080/api/bibliotecario/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dados)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
          }
          return response.json();
        })
        .then(data => {
          // Atualiza a linha na tabela
          linha.children[1].textContent = nomeNovo;
          linha.children[2].textContent = emailNovo;

          Swal.fire({
            icon: 'success',
            title: 'Atualizado!',
            text: 'Os dados foram atualizados com sucesso.'
          });
        })
        .catch(error => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Falha ao atualizar.'
          });
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Todos os campos devem ser preenchidos.'
        });
      }
    }
  });
}


