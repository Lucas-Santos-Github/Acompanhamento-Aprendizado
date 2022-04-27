//TELA DE PERFIL

var ID = 1;
const Usuarios = 'https://6259e03a43fda1299a13640f.mockapi.io/Users/' + ID;


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
      <h2 class="destaque-perfil">Estatísticas</h2>
      <h5><i class="bi bi-lightning-charge-fill"></i>EXP ${data.XPAtual}/${data.XPTotal} – Próximo ranking: ${data.ProximoRanking}</h5>
      <div class="progress" style="height: 35px;">
        <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar"
          style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">100%
        </div>
      </div>
      <br>
      <h2 class="destaque-perfil">Conquistas</h2>
      <div class="card">
        <div class="card-body">
          <i class="bi bi-hourglass-bottom"></i>
          <h5 class="card-title">
            Matador de Quiz</h5>
          <h6 class="card-subtitle mb-2 text-muted">Terminou um quiz em menos de 60s.</h6>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <i class="bi bi-check-circle-fill"></i>
          <h5 class="card-title">O
            Sabe-Tudo</h5>
          <h6 class="card-subtitle mb-2 text-muted">Terminou um Quiz sem errar perguntas.</h6>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <i class="bi bi-star-fill"></i>
          <h5 class="card-title">
            Majestoso</h5>
          <h6 class="card-subtitle mb-2 text-muted">Alcançou o Ranking de Cavaleiro.</h6>
        </div>
      </div>
    </div>
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