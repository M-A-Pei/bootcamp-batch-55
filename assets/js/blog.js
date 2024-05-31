let projectArray = []

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

    //alert(title + start + end + description + javascript + " " + python + " " + java + " " + php)

    image = URL.createObjectURL(image[0])

    const data = {
        title, start, end, description, javascript, python, java, php, image,
        postedAt: new Date()
    }

    projectArray.push(data)

    console.log(projectArray)
}

function renderProject() {  
    document.getElementById("content-container").innerHTML="";

    for(let i = 0; i < projectArray.length; i++){
        document.getElementById("content-container").innerHTML+=`
        <div class="project-container">
        <img src="${projectArray[i].image}">

        <div class="text-container">
          <h1>${projectArray[i].title}</h1>
          <i>${projectArray[i].description}</i>
          <div class="icon-container">
            ${projectArray[i].java == true ? `<i class="fa-brands fa-java fa-lg"></i>` : ""}
            ${projectArray[i].javascript == true ? `<i class="fa-brands fa-js fa-lg"></i>` : ""}
            ${projectArray[i].python == true ? `<i class="fa-brands fa-python"></i>` : ""}
            ${projectArray[i].php == true ? `<i class="fa-brands fa-php fa-lg"></i>` : ""}
          </div>

          <span>posted at ${projectArray[i].postedAt}</span>
          <span>ends in 3 days</span>

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