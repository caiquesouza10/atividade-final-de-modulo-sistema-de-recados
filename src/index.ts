type Recado = {
    idRecados: number,
    descricao:string,
    detalhamento: string,
}

type UserConta = { 
    id: number; 
    login: string;
    senha?: string; 
    recados: Array<Recado>; 
}

// parte onde faz a animação de uma lado para o outro entre login e criar conta.

let btnSignin = document.querySelector("#signin") as HTMLButtonElement;

let btnSignup = document.querySelector("#signup") as HTMLButtonElement;;

let body = document.querySelector("body") as HTMLBodyElement;

declare var swal : any;




btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})


//se o usuario está logado

if(localStorage.getItem('logado')) location.href = "recados.html"

//LOGAR NO SITEMA
const sistemaLogar = document.getElementById("formulario") as HTMLFormElement;
sistemaLogar.addEventListener('submit', (e) => {
    e.preventDefault();

    logarSistema()

});


function logarSistema() {
    const email = (<HTMLInputElement>document.getElementById('email-login')).value;
    const senha = (<HTMLInputElement>document.getElementById('senha-login')).value;
    
   
    const listaUser:UserConta[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const procuraUser = listaUser.find((item:UserConta) => email === item.login && senha === item.senha);

    if(!procuraUser){
        return swal({
            icon: 'error',
            title: 'Usuario não existe!',
        })
    }

    if (email === procuraUser.login && senha === procuraUser.senha) {

        const usuarioLogado:UserConta = {
            id:procuraUser.id,
            login: procuraUser.login,
            recados:procuraUser.recados,
        }
    
        localStorage.setItem('logado', JSON.stringify(usuarioLogado))

        /* alert('Bem-vindo so sitema!') */
        swal({
            title: 'Bem-vindo so sitema!',
            icon: 'success',
        });

        setTimeout(() => {
            window.location.href = 'recados.html';
        }, 2500)
    } else {
        /* alert('Algo deu errado, verifique o e-mail e a senha') */
        swal({
            icon: 'error',
            title: 'Verifique o e-mail e a senha!',
        })
    }
};



// CRIANDO A CONTA 

//CRIAR USUARIO E SALVAR NO LOCALSTORAGE
let btnCriarConta = document.getElementById("criar_conta") as HTMLButtonElement;
btnCriarConta.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = (<HTMLInputElement>document.getElementById('email-cadastrar')).value;
    const senha = (<HTMLInputElement>document.getElementById('senha-cadastrar')).value;
    const repetirSenha = (<HTMLInputElement>document.getElementById('confirma-senha')).value;


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


    limparForm()
});




function salvarConta(email: string, senha: string) {
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    let temEmail = db.some((userEmail: { login: string; }) => userEmail.login === email)



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


function limparForm(): void {
    (<HTMLInputElement>document.getElementById('email-cadastrar')).value = '';
    (<HTMLInputElement>document.getElementById('senha-cadastrar')).value = '';
    (<HTMLInputElement>document.getElementById('confirma-senha')).value = '';
}