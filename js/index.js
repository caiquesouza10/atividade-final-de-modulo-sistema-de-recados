//se o usuario está logado

if(localStorage.getItem('logado')) location.href = "recados.html"

//LOGAR NO SITEMA

document.getElementById("formulario").addEventListener('submit', function (e) {
    e.preventDefault();

    logarSistema()

});




function logarSistema() {
    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha-login').value;

    let usuarioValido = {
        login: "",
        senha: ""
    }

    listaUser = JSON.parse(localStorage.getItem('usuarios') || '[]');

    listaUser.forEach(item => {
        if (email === item.login && senha === item.senha) {
            usuarioValido = {
                id: item.id,
                login: item.login,
                senha: item.senha,
                recados: item.recados,
            }
        }
    });




    if (email === usuarioValido.login && senha === usuarioValido.senha) {

        localStorage.setItem('logado', JSON.stringify(usuarioValido))

        /* alert('Bem-vindo so sitema!') */
        swal({
            title: 'Bem-vindo so sitema!',
            icon: 'success',
        });

        setTimeout(() => {
            window.location.href = 'recados.html';
        }, "2500")
    } else {
        /* alert('Algo deu errado, verifique o e-mail e a senha') */
        swal({
            icon: 'error',
            title: 'Verifique o e-mail e a senha!',
        })
    }
};