const animeList = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "https://api.npoint.io/e24b65e4695fc0064169")
    xhr.onload = () => {
        if(xhr.status == 200){
            resolve(JSON.parse(xhr.response))
        }else{
            reject("Cant load data")
        }
    }

    xhr.onerror = ()=>{
        reject("404 not found")
    }

    xhr.send()
})

function loadAnime(e){
    let rating = "";
    for(let i = 0; i < e.rating; i++){
        rating += '<i class="fa-solid fa-star"></i>'
    }
    return `
        <div class="anime">
        <h1>${e.title}</h1>
        <img src="${e.image}" alt="">
        <div class="rating-container">
        ${rating}
        </div>
        <span>${e.episodes} episodes</span>
        <p>
            ${e.desc}
        </p>
    </div>
    `
}

async function allAnime(){
    const container = document.getElementById("anime-container")
    container.innerHTML = ""
    const x = await animeList
    x.forEach((e)=>{
        container.innerHTML += loadAnime(e);
    })
}

async function ratingAnime(rating){
    const container = document.getElementById("anime-container")
    container.innerHTML = ""
    const x = await animeList
    const filter = x.filter((e)=>{
        return e.rating === rating
    })

    filter.forEach(e => {
        container.innerHTML += loadAnime(e)
    });

    if(filter.length == 0){
        container.innerHTML = `<h1>nothing here</h1>`
    }
    
}

window.addEventListener("load", (event) => {
    allAnime()
  });