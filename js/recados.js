//se o usuario não está logado
if (!localStorage.getItem('logado')) sair()


//SAINDO DO SISTEMA
document.querySelector('#btn-sair').addEventListener('click', () => {
  atualizaRecados()
  localStorage.removeItem('logado')
  sair()
});

function sair() {
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500)
}

// atualiza recados do usuario logado
let usuario = JSON.parse(localStorage.getItem('logado'));

imprimiRecados()

function atualizaRecados() {
  let usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios'))

  usuariosCadastrados.forEach(element => {
    if (element.id === usuario.id) {
      element.recados = usuario.recados
    }
  });

  localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados))
}

const btnSalvarRecados = document.getElementById('btn-salvar')
btnSalvarRecados.addEventListener('click', criarRecados)

let idRecados = 1

function criarRecados() {
  const descricao = document.getElementById('descricao').value
  const detalhamento = document.getElementById('detalhamento').value

  if (!descricao || !detalhamento) {
    // alert("Campos devem ser preenchidos.")
    swal({
      title: 'Oops...',
      text: 'Preencha todos os campos!',
    })
    return;
  }

  usuario.recados.push({
    idRecados,
    descricao,
    detalhamento
  })
  idRecados++

  localStorage.setItem('logado', JSON.stringify(usuario))

  imprimiRecados()
  limparCampos()
}


function imprimiRecados() {
  let tableHTML = document.getElementById('corpo-tabela')
  tableHTML.innerHTML = ""

  for (const index in usuario.recados) {
    let ordem = Number(index) + 1

    tableHTML.innerHTML += `
            <tr>
              <td>${ordem}</td>
              <td>${usuario.recados[index].descricao}</td>
              <td>${usuario.recados[index].detalhamento}</td>
              <td>
              <button id="btnEditar" onclick = "editarRecados(${usuario.recados[index].idRecados})">Editar</button>
              <button id="btnApagar" onclick = "apagarRecados(${usuario.recados[index].idRecados})">Excluir</button>
              </td>
            </tr>
    `
  }
}

function apagarRecados(idRecados) {
  /* const confirme = confirm('Deseja realmente apagar esse recado!')
  if (confirme) {
    let removeRecado = usuario.recados.filter((recado) => recado.idRecados !== idRecados)
    usuario.recados = removeRecado
    localStorage.setItem('logado', JSON.stringify(usuario))
    imprimiRecados()
  } */

  let removeRecado = usuario.recados.filter((recado) => recado.idRecados !== idRecados)

  swal({
      title: "Tem certeza?",
      text: "Uma vez excluido, você não podera recuperar este recado!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((idRecados) => {
      if (idRecados) {
        usuario.recados = removeRecado
        localStorage.setItem('logado', JSON.stringify(usuario))
        imprimiRecados()
        swal("Poof! Seu recado foi deletado!", {
          buttons: false,
          icon: "success",
        });
        setTimeout(() => {
          window.location.href = 'recados.html';
        }, "3000");
      } else {

        swal({
          buttons: false,
          text: "Seu Recado esta seguro! Obigado por não apagar",
        });

        setTimeout(() => {
          window.location.href = 'recados.html';
        }, "3000")
      }
    });
}

let descricaoEditModal = document.getElementById('descricaoEditModal');
let detalhamentoEditModal = document.getElementById('detalhamentoEditModal');

function editarRecados(idRecados) {
  mostrarModal()
  impirmirRecadosModal(idRecados)
  const btnSalvar = document.getElementById('btn-editar')
  btnSalvar.onclick = () => {
    modificaRecados(idRecados)
    fechaModal()
    swal({
      buttons: false,
      text: "Recado editado com sucesso!",
      icon: 'success',
    });
    setTimeout(() => {
      window.location.href = 'recados.html';
    }, "2000")
  }

  const btnCancelar = document.getElementById('btn-cancelar')
  btnCancelar.addEventListener('click', fechaModal)

}

function impirmirRecadosModal(idRecados) {
  const tempRecados = searchRecados(idRecados)
  descricaoEditModal.value = usuario.recados[tempRecados].descricao;
  detalhamentoEditModal.value = usuario.recados[tempRecados].detalhamento;
}

function modificaRecados(idRecados) {
  const tempRecados = searchRecados(idRecados)
  usuario.recados[tempRecados].descricao = descricaoEditModal.value;
  usuario.recados[tempRecados].detalhamento = detalhamentoEditModal.value;

  localStorage.setItem('logado', JSON.stringify(usuario))
  imprimiRecados()

}

function searchRecados(idRecados) {
  return usuario.recados.findIndex((recado) => recado.idRecados === idRecados)
}


function fechaModal() {
  document.getElementById('modal').style.display = 'none';
}

function mostrarModal() {
  document.getElementById('modal').style.display = 'block';
}


function limparCampos() {
  document.getElementById('descricao').value = '';
  document.getElementById('detalhamento').value = '';
}