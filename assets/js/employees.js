const employeeList = [
    {
        name: "Spongebob Squarepants",
        rating: 5,
        quote: "im ready! im ready! im ready!",
        img: "https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg"
    },
    {
        name: "Squidward Tentacles",
        rating: 3,
        quote: "why wont the world recognize real talent?",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaKdxMRfg6lCqvTssMjnRM1183JJnBNhtx6w&s"
    },
    {
        name: "Eugene Krabs",
        rating: 4,
        quote: "money! money! money!",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Mr._Krabs.svg/1200px-Mr._Krabs.svg.png"
    },
    {
        name: "Patrick Star",
        rating: 1,
        quote: "can i have uhhhh....",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/640px-Patrick_Star.svg.png"
    },
    {
        name: "Gary",
        rating: 1,
        quote: "meow",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8DPLa2FLF3lzuYxah5P13D01iZKW5MoWnVy-1yRb3ZEH3QzgynnvjLMBTav0fPKEdaMg&usqp=CAU"
    }
]

function loadEmployee(e){
    let rating = ""
    for(let i = 0; i < e.rating; i++){
        rating += `<i class="fa-solid fa-star text-warning"></i>`
    }
    return `
        <div class="card bg-dark border-light mt-3 mx-2 frame mb-2" style="width: 20rem; height: 400px">
            <div class="bg-light">
                <img class="card-img-top" height="250px" src="${e.img}" alt="Card image cap">
            </div>
            <div class="card-body border-top-light">
            <h5 class="card-title text-light" >${e.name}</h5>
            <div class="rating-container">
                ${rating}
            </div>
            <p class="card-text text-secondary employee-quote" style="height:25px; overflow-y: scroll">- ${e.quote}</p>
            </div>
        </div>
    `
}

function allEmployees(){
    let container = document.getElementById("employeeContainer")
    container.innerHTML = ""
    employeeList.forEach(e => {
        container.innerHTML += loadEmployee(e)
    });
}

function filterEmployee(r){
    let container = document.getElementById("employeeContainer")
    container.innerHTML = ""
    let filter = employeeList.filter(e=>{
        return e.rating == r
    })

    filter.forEach(e=>{
        container.innerHTML += loadEmployee(e)
    });

    if(filter.length == 0){
        container.innerHTML = "<h1 style='margin-top: 30px'>no fish here</h1>"
    }
}

allEmployees()