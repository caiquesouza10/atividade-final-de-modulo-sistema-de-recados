declare var swal: any;

//se o usuario não está logado
if (!localStorage.getItem("logado")) sair();

//SAINDO DO SISTEMA
let sairSistema = document.querySelector("#btn-sair") as HTMLButtonElement;
sairSistema.addEventListener("click", () => {
  atualizaRecados();
  localStorage.removeItem("logado");
  sair();
});

function sair() {
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
}

// atualiza recados do usuario logado
let usuario = JSON.parse(localStorage.getItem("logado") || '[]');

const idUsuario = document.getElementById("logado1")as HTMLSpanElement;
idUsuario.innerHTML = usuario.login;

imprimiRecados();

function atualizaRecados() {
  let usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios") || '[]');

  usuariosCadastrados.forEach((element: { id: number; recados: string }) => {
    if (element.id === usuario.id) {
      element.recados = usuario.recados;
    }
  });

  localStorage.setItem("usuarios", JSON.stringify(usuariosCadastrados));
}

const btnSalvarRecados = document.getElementById(
  "btn-salvar"
) as HTMLButtonElement;
btnSalvarRecados.addEventListener("click", criarRecados);

function criarRecados() {
  let idRecados = 1;

  const descricao = (<HTMLInputElement>document.getElementById("descricao")).value;
  const detalhamento = (<HTMLInputElement>document.getElementById("detalhamento")).value;

  if (!descricao || !detalhamento) {
    // alert("Campos devem ser preenchidos.")
    swal({
      title: "Oops...",
      text: "Preencha todos os campos!",
    });
    return;
  }

  if (usuario.recados.length > 0) {
    const recadoMaiorId = usuario.recados.reduce(
      (acc: { idRecados: number }, next: { idRecados: number }) => {
        if (acc.idRecados < next.idRecados) {
          return next;
        }

        return acc;
      }
    );

    idRecados = recadoMaiorId.idRecados + 1;
  }

  usuario.recados.push({
    idRecados,
    descricao,
    detalhamento,
  });

  localStorage.setItem("logado", JSON.stringify(usuario));

  imprimiRecados();
  limparCampos();
}

function imprimiRecados() {
  let tableHTML = document.getElementById("corpo-tabela") as HTMLTableElement;
  tableHTML.innerHTML = "";

  for (const index in usuario.recados) {
    let ordem = Number(index) + 1;

    tableHTML.innerHTML += `
            <tr>
              <td>${ordem}</td>
              <td>${usuario.recados[index].descricao}</td>
              <td>${usuario.recados[index].detalhamento}</td>
              <td>
              <button id="btnEditar" class="btnEditar" style="border-color: #fff;" onclick = "editarRecados(${usuario.recados[index].idRecados})" >Editar</button>
              <button id="btnApagar" class="btnApagar" style="border-color: #fff;" onclick = "apagarRecados(${usuario.recados[index].idRecados})" >Excluir</button>
              </td>
            </tr>
    `;
  }
}

function apagarRecados(idRecados: number) {
  /* const confirme = confirm('Deseja realmente apagar esse recado!')
  if (confirme) {
    let removeRecado = usuario.recados.filter((recado) => recado.idRecados !== idRecados)
    usuario.recados = removeRecado
    localStorage.setItem('logado', JSON.stringify(usuario))
    imprimiRecados()
  } */

  let removeRecado = usuario.recados.filter(
    (recado: { idRecados: number }) => recado.idRecados !== idRecados
  );

  swal({
    title: "Tem certeza?",
    text: "Uma vez excluido, você não podera recuperar este recado!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((idRecados: number) => {
    if (idRecados) {
      usuario.recados = removeRecado;
      localStorage.setItem("logado", JSON.stringify(usuario));
      imprimiRecados();
      swal("Poof! Seu recado foi deletado!", {
        buttons: false,
        icon: "success",
      });
      setTimeout(() => {
        window.location.href = "recados.html";
      }, 3000);
    } else {
      swal({
        buttons: false,
        text: "Seu Recado esta seguro! Obrigado por não apagar",
      });

      setTimeout(() => {
        window.location.href = "recados.html";
      }, 3000);
    }
  });
}

let descricaoEditModal = document.getElementById("descricaoEditModal");
let detalhamentoEditModal = document.getElementById("detalhamentoEditModal");

function editarRecados(idRecados: number) {
  mostrarModal();
  impirmirRecadosModal(idRecados);
  const btnSalvar = document.getElementById("btn-editar") as HTMLButtonElement;
  btnSalvar.onclick = () => {
    modificaRecados(idRecados);
    fechaModal();
    swal({
      buttons: false,
      text: "Recado editado com sucesso!",
      icon: "success",
    });
    setTimeout(() => {
      window.location.href = "recados.html";
    }, 2000);
  };

  const btnCancelar = document.getElementById(
    "btn-cancelar"
  ) as HTMLButtonElement;
  btnCancelar.addEventListener("click", fechaModal);
}

function impirmirRecadosModal(idRecados: number) {
  const tempRecados = searchRecados(idRecados);
  (<HTMLInputElement>descricaoEditModal).value = usuario.recados[tempRecados].descricao;
  (<HTMLInputElement>detalhamentoEditModal).value = usuario.recados[tempRecados].detalhamento;
}

function modificaRecados(idRecados: number) {
  const tempRecados = searchRecados(idRecados);
  usuario.recados[tempRecados].descricao = (<HTMLInputElement>descricaoEditModal).value;
  usuario.recados[tempRecados].detalhamento = (<HTMLInputElement>detalhamentoEditModal).value;

  localStorage.setItem("logado", JSON.stringify(usuario));
  imprimiRecados();
}

function searchRecados(idRecados: number) {
  return usuario.recados.findIndex(
    (recado: { idRecados: number }) => recado.idRecados === idRecados
  );
}

function fechaModal() {
    (<HTMLModElement>document.getElementById("modal")).style.display = "none";
}

function mostrarModal() {
    (<HTMLModElement>document.getElementById("modal")).style.display = "block";
}

function limparCampos(): void {
    (<HTMLInputElement>document.getElementById("descricao")).value = "";
    (<HTMLInputElement>document.getElementById("detalhamento")).value = "";
}
