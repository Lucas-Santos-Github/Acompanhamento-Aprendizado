
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
        email: "Professor",
        senha: "Professor"
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
        <hr style="height: 5px; margin-top: 1px; background-color: gray; opacity: 100 !important;">
        
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
        <div id ="barraprogresso" class="row bs-wizard" style="border-bottom:0;">
        <div class="col-xs-3 bs-wizard-step complete">
                <div class="progress">
                    <div class="progress-bar"></div>
                </div>
                <a href="#" class="bs-wizard-dot"></a>
            </div>

            <div class="col-xs-3 bs-wizard-step complete">
                <div class="progress">
                    <div class="progress-bar"></div>
                </div>
                <a href="#" class="bs-wizard-dot"></a>
            </div>

            <div class="col-xs-3 bs-wizard-step complete">
                <div class="progress">
                    <div class="progress-bar"></div>
                </div>
                <a href="#" class="bs-wizard-dot"></a>
            </div>

            <div class="col-xs-3 bs-wizard-step complete">
                <div class="progress">
                    <div class="progress-bar"></div>
                </div>
                <a href="#" class="bs-wizard-dot"></a>
                <br>
                <br>
            </div>

            <div class="col-xs-3 bs-wizard-step complete">
                <div class="progress">
                    <div class="progress-bar"></div>
                </div>
                <a href="#" class="bs-wizard-dot"></a>
                <br>
                <br>
            </div>
        
            <h1> ${nivelString(res.currentRanking)}
      `

        });
      console.log(progresso);
    })

  function nivelString(Nivel) {
    //apenas numeros da string do nivel
    var nivel = Nivel.replace(/[^0-9]/g,'');;
    return parseInt(nivel);

  }

  function nivelStrfdsing(Nivel) {
    var nivel = Nivel;
    return nivel.substring(6);

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



