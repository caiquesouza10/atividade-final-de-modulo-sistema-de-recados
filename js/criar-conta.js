//CRIAR USUARIO E SALVAR NO LOCALSTORAGE
let btnCriarConta = document.getElementById("criar_conta")
btnCriarConta.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email-cadastrar').value;
    const senha = document.getElementById('senha-cadastrar').value;
    const repetirSenha = document.getElementById('confirma-senha').value;


    if (!email.match(/\S+@\S+\.\S+/)) {
        /* alert('Preencha a senha com no minimo 5 digitos'); */
        swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha um e-mail valido!',
        })
        return;
    }
    if (senha.length <= 4) {
        /* alert('Preencha a senha com no minimo 5 digitos'); */
        swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha a senha com no minimo 5 digitos!',
        })
        return;
    }

    if (senha !== repetirSenha) {
        /* alert("Senhas não conferem, digite novamente."); */
        swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Senhas não conferem, digite novamente!',
        })
        return;
    }

    salvarConta(email, senha);


    limparCampos()
});




function salvarConta(email, senha) {
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    let temEmail = db.some((userEmail) => userEmail.login === email)



    if (!temEmail) {

        let usuario = {
            id: db.length + 1,
            login: email,
            senha: senha,
            recados: []
        }
        db.push(usuario);


        localStorage.setItem('usuarios', JSON.stringify(db));
        setTimeout(() => {
            location.href = 'index.html'
        }, 3000);
        /* alert('Conta criada com sucesso'); */
        swal("conta criada com sucesso!", {
            buttons: false,
            timer: 3000,
            icon: "success",
        });
    } else {
        swal({
            icon: 'error',
            title: 'E-mail já cadastrado',
        })
    }




}


function limparCampos() {
    document.getElementById('email-cadastrar').value = '';
    document.getElementById('senha-cadastrar').value = '';
    document.getElementById('confirma-senha').value = '';
}