let reviewArray = []

// function getDistance(postedAt){
//   const timeNow = new Date().getTime()
//   const distance = timeNow - postedAt
//   console.log(timeNow)

//   const seconds = Math.floor(distance / 1000)
//   const minute = Math.floor(seconds / 60)
//   const hour = Math.floor(minute / 60)
//   const days = Math.floor(hour / 24)
//   const weeks = Math.floor(days / 7)
//   const months = Math.floor(weeks / 30)

//   console.log(seconds);
//   console.log(minute);
//   console.log(hour);
//   console.log(days);
//   console.log(weeks);
//   console.log(months);

//   if (months > 0){
//     return `${months} months ago`
//   }else if(weeks > 0){
//     return `${weeks} weeks ago`
//   }else if(days > 0){
//     return `${days} days ago`
//   }else if(hour > 0){
//     return `${hour} hours ago`
//   }else if(minute > 0){
//     return `${minute} minutes ago`
//   }else if(seconds > 0){
//     return `${seconds} seconds ago`
//   }

// }

function handleReview(){
    const name = document.getElementById('reviewName').value
    const stayed = document.getElementById('reviewStayed').value
    const left = document.getElementById('reviewLeft').value
    const review = document.getElementById('review').value
    const burger = document.getElementById('reviewBurger').checked
    const pizza = document.getElementById('reviewPizza').checked
    const kelp = document.getElementById('reviewKelp').checked
    const hotdog = document.getElementById('reviewHotdog').checked
    let image = document.getElementById('reviewImage').files

    let errorMsg = "you cant leave these data empty:"

    if(name == ""){
      errorMsg += "\n -your name"
    }
    if(stayed == ""){
      errorMsg += "\n -stayed date"
    }
    if(left == ""){
      errorMsg += "\n -left date"
    }
    if(review == ""){
      errorMsg += "\n -review"
    }
    if(image.length == 0){
      errorMsg += "\n -picture"
    }

    errorMsg += "\n please fill them in"
    
    if(name == "" || stayed == ""|| left == ""|| review == ""|| image == ""){
      alert(errorMsg)
      return
      
    }

    image = URL.createObjectURL(image[0])

    const data = {
        name, stayed, left, review, burger, pizza, kelp, hotdog, image,
        postedAt: new Date()
    }

    reviewArray.push(data)

    console.log(reviewArray)
}

function loadReview() {
  
    if(reviewArray.length == 0){
      document.getElementById("titlecontainer").innerHTML="<h1 class='text-center display-block'>no reviews yet</h1>";
    }else{
      document.getElementById("titlecontainer").innerHTML="<h1 class='text-center'>List of reviews:</h1>";

    }
    document.getElementById("reviewContainer").innerHTML=""

    
    for(let i = 0; i < reviewArray.length; i++){
        document.getElementById("reviewContainer").innerHTML+=`
        <div class="card bg-dark text-light m-3" style="width: 18rem; height: 350px;">
          <img class="card-img-top" src="${reviewArray[i].image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${reviewArray[i].name}</h5>
            <p class="card-text">${reviewArray[i].review}</p>
          </div>
        </div>
        `
    }
}



setInterval(()=>{
    loadReview()
}, 1000)