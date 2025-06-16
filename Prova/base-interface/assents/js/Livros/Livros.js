window.onload = function() {
    carregarGeneros();
    carregarStatus();
    verificarBibliotecario();
};
function limparCampos() {
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('status').selectIndex = 0;
    document.getElementById('bibliotecario').value = '';
    document.getElementById('data').value = '';
}


        //API GET
    fetch('http://localhost:8080/api/livros', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      data.sort((a,b) => a.id - b.id);
      addlinha(data);
    })
    .catch(error => {
      console.log(error);
    });

// Get enum status
function carregarStatus() {
    fetch('http://localhost:8080/api/livros/status')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('status');
            data.forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.text = status;
                select.appendChild(option);
            });
            if(data.includes("DISPONIVEL")){
              select.value = "DISPONIVEL";
            }else if(data.length > 0){
              select.value = data[0];
            }
        })
        .catch(error => console.error('Erro ao carregar status:', error));
}

// Get enum generos

function carregarGeneros() {
    fetch('http://localhost:8080/api/livros/generos') // <-- sua rota GET de enum
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API de gêneros');
            }
            return response.json();
        })
        .then(data => {
            const selectGenero = document.getElementById('genero');
            selectGenero.innerHTML='';

            const optionVazio = document.createElement('option');
            optionVazio.value = '';
            optionVazio.text = 'Selecione o gênero';
            optionVazio.disabled = true;
            optionVazio.selected = true;
            selectGenero.appendChild(optionVazio);
            data.forEach(genero => {
                const option = document.createElement('option');
                option.value = genero;
                option.text = genero;
                selectGenero.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar gêneros:', error);
            alert('Erro ao carregar os gêneros!');
        });
}

// Carregar bibliotecario

function verificarBibliotecario(){
  return fetch(`http://localhost:8080/api/bibliotecario`)
  .then(response => {
    if(!response.ok){
      throw new Error('Bibliotecário não encontrado');
    }
    return response.json();
})
.catch(error=> {
  console.error('Erro na verificação do bibliotecario:' , error);
  return null;
});
}


  //Adicionar Linha na Tabela
  function addlinha(dadosAPI){
      const tabela = document.getElementById('tabelaLivros');
      dadosAPI.forEach(element => {   
        const linha = document.createElement('tr');
        //Adicionando HTML
        linha.innerHTML = `
          <tr>
          <td class="px-4 py-2">${element.id}</td>
              <td class="px-4 py-2">${element.titulo}</td>
              <td class="px-4 py-2">${element.autor}</td>
              <td class="px-4 py-2">${element.genero.replace(carregarGeneros())}</td>
              <td class="px-4 py-2">${element.status.replace(carregarStatus)}</td>
              <td class="px-4 py-2">${element.bibliotecario ? element.bibliotecario.nome : 'Não informado'}</td>
              <td class="px-4 py-2">${element.data_cadastro}</td>
              <td class="px-4 py-2 flex gap-2 justify-center items-center">
              <button class="bg-red-500 text-white px-2 py-1 rounded">remover</button>
              <button class="bg-green-500 text-black px-2 py-1 rounded">editar</button>
          </td>
          </tr>
        `;
        
        tabela.appendChild(linha);
      });
    }

    //Cadastrar Novas pessoas do formulario
 function cadastrar() {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const genero = document.getElementById('genero').value.trim();
    const status = document.getElementById('status').value.trim();
    const bibliotecarioId = document.getElementById('bibliotecario').value.trim();
    const dataCadastro = document.getElementById('data').value.trim();

    if (titulo && autor && genero && status && bibliotecarioId && dataCadastro) {

        const livro = {
            titulo: titulo,
            autor: autor,
            genero: genero,
            status: status,
            data_cadastro: dataCadastro,
            bibliotecario: {id: parseInt(bibliotecarioId) }
        };

        fetch('http://localhost:8080/api/livros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livro)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar livro');
            }
            return response.json();
        })
        .then(data => {
            addlinha([data]); 
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Livro cadastrado com sucesso!'
            });

            limparCampos();
        })
        .catch(error => {
            console.error('Erro no cadastro:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Falha ao cadastrar livro. Verifique os dados.'
            });
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Campos obrigatórios!',
            text: 'Preencha todos os campos antes de cadastrar.'
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
      const titulo = dadosbotao.parentElement.parentElement;
      titulo.remove();
      fetch(`http://localhost:8080/api/livros/${id}`, {
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
  const tituloAtual = linha.children[1].textContent.trim();
  const autorAtual = linha.children[2].textContent.trim();
  const generoAtual = linha.children[3].textContent.trim();
  const statusAtual = linha.children[4].textContent.trim();
  const bibliotecarioAtual = linha.children[5].textContent.trim();
  const dataAtual = linha.children[6].textContent.trim();

  Promise.all([
    fetch('http://localhost:8080/api/livros/generos').then(res => res.json()),
    fetch('http://localhost:8080/api/livros/status').then(res => res.json()),
    fetch('http://localhost:8080/api/bibliotecario').then(res => res.json()) // Busca bibliotecarios
  ])
  .then(([generos, statusList, bibliotecarios]) => {
    // Gera options para gênero
    const generoOptions = generos.map(g =>
      `<option value="${g}" ${g === generoAtual ? 'selected' : ''}>${g}</option>`
    ).join('');

    // Gera options para status
    const statusOptions = statusList.map(s =>
      `<option value="${s}" ${s === statusAtual ? 'selected' : ''}>${s}</option>`
    ).join('');

    let bibliotecarioOptions = bibliotecarios.map(b =>
      `<option value="${b.id}" ${b.nome === bibliotecarioAtual ? 'selected' : ''}>${b.nome}</option>`
    ).join('');

    Swal.fire({
      title: 'Editar Livro',
      html:
        `<input id="swal-titulo" class="swal2-input" placeholder="Título" value="${tituloAtual}">
         <input id="swal-autor" class="swal2-input" placeholder="Autor" value="${autorAtual}">
         <select id="swal-genero" class="swal2-select">${generoOptions}</select>
         <select id="swal-status" class="swal2-select">${statusOptions}</select>
         <select id="swal-bibliotecario" class="swal2-select">${bibliotecarioOptions}</select>
         <input id="swal-dataCadastro" class="swal2-input" placeholder="Data de Cadastro" value="${dataAtual}">`,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const tituloNovo = document.getElementById('swal-titulo').value.trim();
        const autorNovo = document.getElementById('swal-autor').value.trim();
        const generoNovo = document.getElementById('swal-genero').value.trim();
        const statusNovo = document.getElementById('swal-status').value.trim();
        const bibliotecarioIdNovo = document.getElementById('swal-bibliotecario').value.trim();
        const dataNova = document.getElementById('swal-dataCadastro').value.trim();

        if (tituloNovo && autorNovo && generoNovo && statusNovo && dataNova) {
          const dados = {
            titulo: tituloNovo,
            autor: autorNovo,
            genero: generoNovo,
            status: statusNovo,
            data_cadastro: dataNova,
            bibliotecario: { id: parseInt(bibliotecarioIdNovo) }
          };

          fetch(`http://localhost:8080/api/livros/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error("Erro na requisição: " + response.status);
            }
            return response.json();
          })
          .then(data => {
            linha.children[1].textContent = tituloNovo;
            linha.children[2].textContent = autorNovo;
            linha.children[3].textContent = generoNovo;
            linha.children[4].textContent = statusNovo;
            linha.children[5].textContent = bibliotecarios.find(b => b.id === parseInt(bibliotecarioIdNovo))?.nome || bibliotecarioAtual;
            linha.children[6].textContent = dataNova;

            Swal.fire({
              icon: 'success',
              title: 'Atualizado!',
              text: 'Livro atualizado com sucesso.'
            });
          })
          .catch(error => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'Falha ao atualizar o livro.'
            });
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Campos obrigatórios!',
            text: 'Preencha todos os campos.'
          });
        }
      }
    });
  })
  .catch(error => {
    console.error('Erro ao carregar dados para edição:', error);
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Falha ao carregar dados para edição.'
    });
  });
}



