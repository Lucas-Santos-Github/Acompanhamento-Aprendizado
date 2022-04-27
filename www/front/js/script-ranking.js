const rank = document.querySelector('.rank')

const getPosts = async() => {
    const response = await  fetch(`https://jsonplaceholder.typicode.com/users`)
    return response.json()
}

const addPostsIntoDom = async () => {
    const posts = await getPosts()
   console.log(posts);
   const melhores = posts.map(rank => 
    `<table class="table table-striped">
      <tbody>
        <tr>
          <th scope="row">${rank.id}</th>
          <td>${rank.name}</td>
          <td>${rank.phone}</td>
        </tr>`

     /*`<div class="names">
     <ul>
     <li> ${rank.id} ${rank.name} ${rank.phone} </span> </li>
     </ul> 
    </div>`*/
   ).join('')
   rank.innerHTML = melhores

}
addPostsIntoDom()
const number = [1,2,3,4,5]

const numeroMaior =number.reduce(function(a, b) {
    return Math.max(a, b);
  }, -Infinity);

  console.log(numeroMaior);