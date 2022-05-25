
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
        email: "cesarh.oncala@gmail.com",
        senha: "1234"
      })
    })

    .then(res => res.json())
    .then(x => { console.log(x)
      
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
                style="color: white; text-transform: uppercase; text-shadow: 2px 2px 8px #000000;">${x.user.Nome}</h2>
              <p class="fw-bold" style="color: white;">@${x.user.role}</p>
              <p class="infousuario" style="color: white;"><i class="bi bi-clock"></i> Ano de nascimento:${pegaAno(x.user.nascimento)} </p>
              <p class="infousuario" style="color: white;"><i class="bi bi-award"></i>@${x.user.role}</p>
            </div>
          </div>
        </div>
        <hr style="height: 5px; margin-top: 1px; background-color: gray; opacity: 100 !important;">
        
        
      `
      localStorage.setItem("auth", x.jwt) })

    .then(async x => {
      let progresso = await fetch(url + 'Progress/progress', {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('auth')}`
        }
      })
      console.log(progresso);
      
    })


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