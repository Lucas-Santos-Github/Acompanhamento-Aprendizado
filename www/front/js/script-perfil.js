//TELA DE PERFIL

const Usuarios = 'https://6259e03a43fda1299a13640f.mockapi.io/Users'

detalhesUsuario(Usuarios);

function detalhesUsuario(url) {
    fetch(url)
    .then(res => res.json())
    .then(res => console.log(res));
}