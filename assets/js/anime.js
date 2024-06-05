const animeList = [
    {
        title: "Dungeon Meshi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM-Ol4D8LVkv_q7p0pDgy6OazyLaC_7Yfh5w&s",
        desc: "this is an anime about eating dungeon food",
        episodes: "24",
        rating: 4,
    },
    {
        title: "Kaiju No 8",
        image: "https://awsimages.detik.net.id/community/media/visual/2024/04/18/anime-kaiju-no8.jpeg?w=700&q=90",
        desc: "this is an anime about a dude turning into a kaiju",
        episodes: "12",
        rating: 3,
    },
    {
        title: "Solo Leveling",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbLuBnsgmyaR5ioyOHdzetZvxp8Ie1dbG9HQ&s",
        desc: "this is an anime about eating dungeon food",
        episodes: "24",
        rating: 5,
    },
    {
        title: "Kekkai Sensen",
        image: "https://m.media-amazon.com/images/I/71rcnrEOTIL._AC_UF894,1000_QL80_.jpg",
        desc: "this is an anime about a chaotic world where humans and aliens live together",
        episodes: "12",
        rating: 2,
    },
    {
        title: "Konosuba",
        image: "https://i.pinimg.com/originals/f3/3c/6e/f33c6efb524bf80a0c963bec947200ac.jpg",
        desc: "this is an anime about a group of idiots going on adventures",
        episodes: "24",
        rating: 4,
    },
]

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

function allAnime(){
    const container = document.getElementById("anime-container")
    container.innerHTML = ""
    animeList.forEach((e)=>{
        container.innerHTML += loadAnime(e);
    })
}

function ratingAnime(rating){
    const container = document.getElementById("anime-container")
    container.innerHTML = ""
    const filter = animeList.filter((e)=>{
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