const tableRank = document.querySelector(".table-rank");

const getPosts = async () => {
  const response = await fetch(
    `https://6259e03a43fda1299a13640f.mockapi.io/Users`
  );
  return response.json();
};


const addPostsIntoDom = (posts) => {
  const melhores = posts.map(({ Nome, id, XPAtual}) => {
      return `
        <tr>
        <td>${id}</td>
        <td>${Nome}</td>
        <td>${XPAtual}</td>
        </tr>
        `;
    }).join("");
    tableRank.innerHTML += melhores;
};

const addPostsIntoPodium = (podium) => {
  podium.forEach((item, index) => {
    console.log('index:', index)
    document.querySelector(`.top${index + 1} .profile`).src = item.ProfilePic;
    document.querySelector(`.top${index + 1} .xp-number`).innerHTML = `${item.XPAtual} xp`;
    document.querySelector(`.top${index + 1} .name`).innerHTML = `${item.Nome}`;
  })
}

const sortByXP = ( a, b ) => {
  if ( a.XPAtual < b.XPAtual ){
    return 1;
  }
  if ( a.XPAtual > b.XPAtual ){
    return -1;
  }
  return 0;
}


const Rank3Position = async() => {
    const response = await getPosts();
    let array = []
    // const filtro = top3.filter((teste) => {
    //     array.push(teste.XPAtual)
    // })
    const sorted = response.sort(sortByXP)
    console.log('sorted:', sorted)

    const [top1, top2, top3, ...rest] = sorted;
    console.log('top1, top2, top3, ...rest:', top1, top2, top3, rest)
    addPostsIntoPodium([top1, top2, top3])

    addPostsIntoDom(rest)
    // let n = 0
    // const top = top3.filter((teste) => {
     
    //     if(teste.XPAtual == sorted[n] ) {
    //         console.log(teste);
    //     }
    //    ;
    // })

    // console.log(sorted[0],sorted[1], sorted[2]);
}
Rank3Position()