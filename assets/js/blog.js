let projectArray = []

function getDistance(postedAt){
  const timeNow = new Date().getTime()
  const distance = timeNow - postedAt
  console.log(timeNow)

  const seconds = Math.floor(distance / 1000)
  const minute = Math.floor(seconds / 60)
  const hour = Math.floor(minute / 60)
  const days = Math.floor(hour / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(weeks / 30)

  console.log(seconds);
  console.log(minute);
  console.log(hour);
  console.log(days);
  console.log(weeks);
  console.log(months);

  if (months > 0){
    return `${months} months ago`
  }else if(weeks > 0){
    return `${weeks} weeks ago`
  }else if(days > 0){
    return `${days} days ago`
  }else if(hour > 0){
    return `${hour} hours ago`
  }else if(minute > 0){
    return `${minute} minutes ago`
  }else if(seconds > 0){
    return `${seconds} seconds ago`
  }

}

function handleUpload(){
    const title = document.getElementById('title').value
    const start = document.getElementById('start').value
    const end = document.getElementById('end').value
    const description = document.getElementById('description').value
    const javascript = document.getElementById('javascript').checked
    const python = document.getElementById('python').checked
    const java = document.getElementById('java').checked
    const php = document.getElementById('php').checked
    let image = document.getElementById('image').files

    let errorMsg = "you cant leave these data empty:"

    if(title == ""){
      errorMsg += "\n -project name"
    }
    if(start == ""){
      errorMsg += "\n -start date"
    }
    if(end == ""){
      errorMsg += "\n -end date"
    }
    if(description == ""){
      errorMsg += "\n -description"
    }
    if(image.length == 0){
      errorMsg += "\n -upload image"
    }

    errorMsg += "\n please fill them in"
    
    if(title == "" || start == ""|| end == ""|| description == ""|| image == ""){
      alert(errorMsg)
      return
      
    }

    image = URL.createObjectURL(image[0])

    const data = {
        title, start, end, description, javascript, python, java, php, image,
        postedAt: new Date()
    }

    projectArray.push(data)

    console.log(projectArray)
}

function renderProject() {  
    document.getElementById("content-container").innerHTML="<h1>List of projects:</h1>";

    for(let i = 0; i < projectArray.length; i++){
        document.getElementById("content-container").innerHTML+=`
        <div class="project-container">
        <img src="${projectArray[i].image}">

        <div class="text-container">
          <h1>${projectArray[i].title}</h1>
          <i class="desc">${projectArray[i].description}</i>
          <div class="icon-container">
            ${projectArray[i].java == true ? `<i class="fa-brands fa-java fa-lg"></i>` : ""}
            ${projectArray[i].javascript == true ? `<i class="fa-brands fa-js fa-lg"></i>` : ""}
            ${projectArray[i].python == true ? `<i class="fa-brands fa-python"></i>` : ""}
            ${projectArray[i].php == true ? `<i class="fa-brands fa-php fa-lg"></i>` : ""}
          </div>

          <span>${getDistance(projectArray[i].postedAt)}</span>
          <span>from ${projectArray[i].start} to ${projectArray[i].end}</span>

          <div class="btn-div">
            <button class="edit-btn">edit</button>
            <button class="detail-btn">detail</button>
          </div>


        </div>
      </div>
        `
    }
}


setInterval(()=>{
    renderProject()
}, 1000)