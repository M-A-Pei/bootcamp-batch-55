const employeeList = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("get", "https://api.npoint.io/5ffd2e387e2e68434d0b", true)
    xhr.onload = () => {
        if(xhr.status == 200){
            resolve(JSON.parse(xhr.response))
        }else{
            reject("request failed")
        }
    }

    xhr.onerror = () => {
        reject("404 not found")
    }

    xhr.send()
})

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

async function allEmployees(){
    let container = document.getElementById("employeeContainer")
    container.innerHTML = ""
    const x = await employeeList
    console.log(x[0])
    x.forEach(e => {
        container.innerHTML += loadEmployee(e)
    });
}

 async function filterEmployee(r){
    let container = document.getElementById("employeeContainer")
    container.innerHTML = ""
    const x = await employeeList
    let filter = x.filter(e=>{
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