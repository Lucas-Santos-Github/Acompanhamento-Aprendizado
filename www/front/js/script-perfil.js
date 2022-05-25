//TELA DE PERFIL

const Usuarios = 'http://g1gameficacao-001-site1.btempurl.com/api/';


detalhesUsuario(Usuarios);

function detalhesUsuario(url) {
  fetch(url + 'Users/authenticate',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        email: "lucas@teste.com", //Professor ; cesarh.oncala@gmail.com ; lucas@teste.com 
        senha: "1234" //Professor ; 1234 ; 1234
      })
    })
    .then(res => res.json())
    .then(x => {
      console.log(x)
      document.getElementById("infousuario").innerHTML =
        `
      <div class="container" id="infousuario">
        <div class="container imagemperfil" id="imagemHero">
          <div class="row">
            <div class="col-sm-2">
              <img
                src="${x.user.profile_pic ? x.user.profile_pic : "https://i.pinimg.com/736x/d6/82/57/d682577ac42e84125461689aa9b4623a.jpg"}"
                class="avatar">
            </div>
            <div class="col-sm" style="padding-top: 25px">
              <h2 class="infousuario fw-bolder"
                style="color: white; text-transform: uppercase; text-shadow: 2px 2px 8px #000000;">${x.user.nome}</h2>
              <p class="fw-bold" style="color: white;">${x.user.email}</p>
              <p class="infousuario" style="color: white;"><i class="bi bi-calendar"></i> Nascido em ${pegaAno(x.user.nascimento)}</p>
              <p class="infousuario" style="color: white;"><i class="bi bi-briefcase"></i> ${x.user.role}</p>
            </div>
          </div>
        </div>
        <hr style="height: 5px; margin-top: 1px; background-color: gray; opacity: 100 !important;">
        
      </div>
      `
      document.getElementById("imagemHero").style.backgroundImage = `url('${x.user.BackgroundPic ? x.user.BackgroundPic : "https://i.pinimg.com/originals/31/0d/4a/310d4a2f36b4fe4a07a31f5f7759a4d3.jpg"}')`
      localStorage.setItem("auth", x.jwt)
    })
    .then(x => {
      fetch(url + 'Progress/progress', {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      })
        .then(x => x.json())
        .then(res => {
          console.log(res)
          document.getElementById("estatisticas").innerHTML =
            `
        <h2 class="destaque-perfil">Estatísticas</h2>
        <h5><i class="bi bi-award-fill"></i>Ranking atual: ${res.currentRanking ? res.currentRanking : "-"}</h5>
        <h5><i class="bi bi-capslock-fill"></i>Próximo ranking: ${res.nextRanking ? res.nextRanking : "-"}</h5>
        <h5><i class="bi bi-lightning-charge-fill"></i>EXP ${res.currentExp ? res.currentExp : 0}/${res.totalExp ? res.totalExp : "0"}</h5>
        <p>Progresso do nível atual — <i>para mais informações sobre o progresso, clique <a href='progresso.html' target='_blank'><b>aqui!</b></a>:</i></p>
        <div class="progress" style="height: 35px;">
          <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar"
            style="width: ${res.progressPercent ? res.progressPercent : "0"}%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">${res.progressPercent}%
          </div>
        </div>
        <br>
        `
        });
    })
    .then(x => {
      fetch(url + 'Achivments/userachitivments', {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      })
        .then(x => x.json())
        .then(res => {
          console.log(res)

          achievements.innerHTML = `<h2 class="destaque-perfil">Conquistas</h2>`;

          res.forEach((conquista) => {
            const { id, title, icon, description} = conquista;
            const conquistaEl = document.createElement("div");

            conquistaEl.id = id;

            conquistaEl.innerHTML =
            `
            <div class="card" style="width: 18rem;">
            <img src="${icon}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
              </div>
            </div>
            <br>
            `
            achievements.appendChild(conquistaEl);
          })
        });
    });

  function pegaAno(Criacao) {
    var ano = new Date(Criacao);
    return ano.getFullYear();
  }

}