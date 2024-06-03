let clicked = false

function openBurger(){
    let burger = document.getElementById('burger-nav-container')
    if(!clicked){
        burger.style.display = "none"
        clicked = true
    }else{
        burger.style.display = "flex"
        clicked = false
    }
}