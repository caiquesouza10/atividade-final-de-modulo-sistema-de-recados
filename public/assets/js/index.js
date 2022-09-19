"use strict";
// parte onde faz a animação de uma lado para o outro entre login e criar conta.
let btnSignin = document.querySelector("#signin");
let btnSignup = document.querySelector("#signup");
;
let body = document.querySelector("body");
btnSignin.addEventListener("click", function () {
    body.className = "sign-in-js";
});
btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});
//se o usuario está logado
if (localStorage.getItem('logado'))
    location.href = "recados.html";
//LOGAR NO SITEMA
const sistemaLogar = document.getElementById("formulario");
sistemaLogar.addEventListener('submit', (e) => {
    e.preventDefault();
    logarSistema();
});
function logarSistema() {
    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha-login').value;
    const listaUser = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const procuraUser = listaUser.find((item) => email === item.login && senha === item.senha);
    if (!procuraUser) {
        return swal({
            icon: 'error',
            title: 'Usuario não existe!',
        });
    }
    if (email === procuraUser.login && senha === procuraUser.senha) {
        const usuarioLogado = {
            id: procuraUser.id,
            login: procuraUser.login,
            recados: procuraUser.recados,
        };
        localStorage.setItem('logado', JSON.stringify(usuarioLogado));
        /* alert('Bem-vindo so sitema!') */
        swal({
            title: 'Bem-vindo so sitema!',
            icon: 'success',
        });
        setTimeout(() => {
            window.location.href = 'recados.html';
        }, 2500);
    }
    else {
        /* alert('Algo deu errado, verifique o e-mail e a senha') */
        swal({
            icon: 'error',
            title: 'Verifique o e-mail e a senha!',
        });
    }
}
;
// CRIANDO A CONTA 
//CRIAR USUARIO E SALVAR NO LOCALSTORAGE
let btnCriarConta = document.getElementById("criar_conta");
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
        });
        return;
    }
    if (senha.length <= 4) {
        /* alert('Preencha a senha com no minimo 5 digitos'); */
        swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha a senha com no minimo 5 digitos!',
        });
        return;
    }
    if (senha !== repetirSenha) {
        /* alert("Senhas não conferem, digite novamente."); */
        swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Senhas não conferem, digite novamente!',
        });
        return;
    }
    salvarConta(email, senha);
    limparForm();
});
function salvarConta(email, senha) {
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    let temEmail = db.some((userEmail) => userEmail.login === email);
    if (!temEmail) {
        let usuario = {
            id: db.length + 1,
            login: email,
            senha: senha,
            recados: []
        };
        db.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(db));
        setTimeout(() => {
            location.href = 'index.html';
        }, 3000);
        /* alert('Conta criada com sucesso'); */
        swal("conta criada com sucesso!", {
            buttons: false,
            timer: 3000,
            icon: "success",
        });
    }
    else {
        swal({
            icon: 'error',
            title: 'E-mail já cadastrado',
        });
    }
}
function limparForm() {
    document.getElementById('email-cadastrar').value = '';
    document.getElementById('senha-cadastrar').value = '';
    document.getElementById('confirma-senha').value = '';
}
