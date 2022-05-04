//TELA DE PERFIL

var ID = 1;
const Usuarios = 'https://626991f8aa65b5d23e86ed83.mockapi.io/Progress/' + ID;


detalhesUsuario(Usuarios);

function detalhesUsuario(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => document.getElementById("infousuario").innerHTML = 
    `
    <div class="container" id="infousuario">
      <div class="container imagemperfil" id="imagemHero">
        <div class="row">
          <div class="col-sm-2">
            <img
              src="${data.ProfilePic}"
              class="avatar">
          </div>
          <div class="col-sm" style="padding-top: 25px">
            <h2 class="infousuario fw-bolder"
              style="color: white; text-transform: uppercase; text-shadow: 2px 2px 8px #000000;">${data.Nome}</h2>
            <p class="fw-bold" style="color: white;">@${data.Login}</p>
            <p class="infousuario" style="color: white;"><i class="bi bi-clock"></i> Membro desde ${pegaAno(data.CreationDate)}</p>
            <p class="infousuario" style="color: white;"><i class="bi bi-award"></i> ${data.Ranking}</p>
          </div>
        </div>
      </div>
      <hr style="height: 5px; margin-top: 1px; background-color: gray; opacity: 100 !important;">
      
      
    `
    );

    function pegaAno(Criacao) {
        var ano = new Date(Criacao);
        return ano.getFullYear();
    }

    imagemHero(url);

    function imagemHero(url) {
        fetch(url)
        .then(res => res.json())
        .then(data => document.getElementById("imagemHero").style.backgroundImage = `url('${data.BackgroundPic}')`);
    }

}