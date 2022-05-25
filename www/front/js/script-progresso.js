
const Usuarios = 'http://g1gameficacao-001-site1.btempurl.com/api/';


detalhesUsuario(Usuarios);

barraProgresso(Usuarios);

function detalhesUsuario(url) {
  fetch(url + 'Users/authenticate',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        email: "professor",
        senha: "professor"
      })
    })

    .then(res => res.json())
    .then(x => {
      console.log(x)

      document.getElementById('infousuario').innerHTML =
        `
        
        <div class="container" id="infousuario">
        <div class="container imagemperfil" id="imagemHero" >
          <div class="row">
            <div class="col-sm-2">
            <img
            src="${x.user.profile_pic ? x.user.profile_pic : "https://p4.wallpaperbetter.com/wallpaper/447/658/479/roronoa-zoro-4k-new-hd-pc-wallpaper-thumb.jpg"}"
            class="avatar">
            </div>
            <div class="col-sm" style="padding-top: 25px">
              <h2 class="infousuario fw-bolder"
                style="color: white; text-transform: uppercase; text-shadow: 2px 2px 8px #000000;">${x.user.nome}</h2>
              <p class="fw-bold" style="color: white;">@${x.user.role}</p>
              <p class="infousuario" style="color: white;"><i class="bi bi-clock"></i> Ano de nascimento:${pegaAno(x.user.nascimento)} </p>
              
            </div>
          </div>
        </div>
        
      `
      document.getElementById("imagemHero").style.backgroundImage = `url('${x.user.BackgroundPic ? x.user.BackgroundPic : "https://images5.alphacoders.com/889/889488.jpg"}')`
      localStorage.setItem("auth", x.jwt)
    })

    .then(async x => {
      let progresso = await fetch(url + 'Progress/progress', {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      })
        .then(x => x.json())
        .then(res => {
          console.log(res)
          document.getElementById("barraprogresso").innerHTML =
            `
            <br>
      <h2 class="nivel-progresso">Estatísticas</h2>
      <h4><i class="bi bi-lightning-charge-fill"></i>Atual: ${res.currentRanking}</h5>
      <h4><i class="bi bi-lightning-charge-fill"></i>Próximo nível: ${res.nextRanking}</h5>
      
        <h2 class="nivel-progresso">Nível</h2>

        <div class="a-box-card body-card-perfil">
            <div class="img-container-card ">
                <div class="img-inner img-container-card">
                    <div class="inner-skew-card">
                        <img
                            src="https://p4.wallpaperbetter.com/wallpaper/447/658/479/roronoa-zoro-4k-new-hd-pc-wallpaper-thumb.jpg">
                    </div>
                </div>
            </div>
            <div class="text-container-card">
                <h3>Nível 1</h3>
                <div>
                    Descrição nivel 1.
                </div>
            </div>
        </div>

        <div class="a-box-card body-card-perfil">
            <div class="img-container-card ">
                <div class="img-inner img-container-card">
                    <div class="inner-skew-card">
                        <img
                            src="https://besthqwallpapers.com/Uploads/24-4-2018/49759/thumb2-4k-vegeta-fan-art-profile-dragon-ball-z.jpg">
                    </div>
                </div>
            </div>
            <div class="text-container-card">
                <h3>Nível 2</h3>
                <div>
                    Descrição nivel 2.
                </div>
            </div>
        </div>

        <div class="a-box-card body-card-perfil">
            <div class="img-container-card ">
                <div class="img-inner img-container-card">
                    <div class="inner-skew-card">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgWBfX7C2Z1CRbdgVUPmYiP105LbBi2IBeqw&usqp=CAU">
                    </div>
                </div>
            </div>
            <div class="text-container-card">
                <h3>Nível 3</h3>
                <div>
                    Descrição nivel 3.
                </div>
            </div>
        </div>

        <div class="a-box-card body-card-perfil">
            <div class="img-container-card ">
                <div class="img-inner img-container-card">
                    <div class="inner-skew-card">
                        <img
                            src="https://besthqwallpapers.com/Uploads/2-7-2018/57797/thumb2-ultra-instinct-goku-4k-son-goku-fire-dragon-ball.jpg">
                    </div>
                </div>
            </div>
            <div class="text-container-card">
                <h3>Nível 4</h3>
                <div>
                    Descrição nivel 4.
                </div>
            </div>
        </div>

        <div class="a-box-card body-card-perfil">
            <div class="img-container-card ">
                <div class="img-inner img-container-card">
                    <div class="inner-skew-card">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxmp59t-tgQDuK_XUpXmUIJYOWXJ-9M7soSg&usqp=CAU">
                    </div>
                </div>
            </div>
            <div class="text-container-card">
                <h3>Nível 5</h3>
                <div>
                    Descrição nivel 5.
                </div>
            </div>
        </div>
        <div id ="barraprogresso" class="row bs-wizard" style="border-bottom:0;">
        <div class="col-xs-3 bs-wizard-step ${nivelString(res.currentRanking) <= 1 ? "" : "complete"}">
                <div class="progress">
                    <div class="progress-bar"></div>
                </div>
                <a href="#" class="bs-wizard-dot"></a>
            </div>

            <div class="col-xs-3 bs-wizard-step ${nivelString(res.currentRanking) < 2 ? "" : "complete"}">
                <div class="progress">
                    <div class="progress-bar"></div>
                </div>
                <a href="#" class="bs-wizard-dot"></a>
            </div>

            <div class="col-xs-3 bs-wizard-step ${nivelString(res.currentRanking) < 3 ? "" : "complete"}">
                <div class="progress">
                    <div class="progress-bar"></div>
                </div>
                <a href="#" class="bs-wizard-dot"></a>
            </div>

            <div class="col-xs-3 bs-wizard-step ${nivelString(res.currentRanking) < 4 ? "" : "complete"}">
                <div class="progress">
                    <div class="progress-bar"></div>
                </div>
                <a href="#" class="bs-wizard-dot"></a>
                <br>
                <br>
            </div>

            <div class="col-xs-3 bs-wizard-step ${nivelString(res.currentRanking) < 5 ? "" : "complete"}">
                <div class="progress">
                    <div class="progress-bar"></div>
                </div>
                <a href="#" class="bs-wizard-dot"></a>
                
            </div>
        </div>
      `

        });
      console.log(progresso);
    })

  function nivelString(Nivel) {
    //apenas numeros da string do nivel
    var nivel = Nivel.replace(/[^0-9]/g, '');;
    return parseInt(nivel);

  }

  function trataNivel(string) {

    if (string >= 5)
      return 'complete'

  }

  function pegaAno(Criacao) {
    var ano = new Date(Criacao);
    return ano.getFullYear();
  }

  imagemHero(url);

  function imagemHero(url) {
    fetch(url)
      .then(res => res.json())
      .then(x => document.getElementById("imagemHero").style.backgroundImage = `url('${x.BackgroundPic}')`);
  }

}



