

const tableRank = document.querySelector(".table-rank");

const getPosts = async () => {
  const response = await fetch(
    `http://g1gameficacao-001-site1.btempurl.com/api/Ranking/Ranking`, 
    {
      headers:{
        'authorization': `Bearer ${localStorage.getItem('auth')}`
     }
    }
  );
  return response.json();
};

const addPostsIntoDom = (posts) => {
  const melhores = posts.map(({ nome, nota}) => {
      return `
        <tr>
        <td style=" font-style: italic; font-size: 18px;">${nome}</td>
        <td style="text-align: center; font-style: italic; font-size: 18px;">${nota}</td>
        </tr>
        `;
    }).join("");
    tableRank.innerHTML += melhores;
};

const addPostsIntoPodium = (podium) => {
  podium.forEach((item, index) => {
    console.log('index:', index)
    document.querySelector(`.top${index + 1} .xp-number`).innerHTML = `${item.nota}xp`;
    document.querySelector(`.top${index + 1} .name`).innerHTML = `${item.nome}`;
  })
}

const sortByXP = ( a, b ) => {
  if ( a.nota < b.nota ){
    return 1;
  }
  if ( a.nota > b.nota ){
    return -1;
  }
  return 0;
}


const Rank3Position = async() => {
    const response = await getPosts();
    let array = []
    // const filtro = top3.filter((teste) => {
    //     array.push(teste.nota)
    // })
    const sorted = response.sort(sortByXP)
    console.log('sorted:', sorted)

    const [top1, top2, top3, ...rest] = sorted;
    console.log('top1, top2, top3, ...rest:', top1, top2, top3, rest)
    addPostsIntoPodium([top1, top2, top3])

    addPostsIntoDom(rest)
    // let n = 0
    // const top = top3.filter((teste) => {
     
    //     if(teste.nota == sorted[n] ) {
    //         console.log(teste);
    //     }
    //    ;
    // })

    // console.log(sorted[0],sorted[1], sorted[2]);
}
Rank3Position()


