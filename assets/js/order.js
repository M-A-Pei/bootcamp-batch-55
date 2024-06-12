function handleOrder(){
    const name = document.getElementById("orderName").value
    const number = document.getElementById("orderNumber").value
    const food = document.getElementById("orderFood").value
    const address = document.getElementById("orderAddress").value

    let errorMsg = "the following data is empty:\n"
    if(name == ""){
        errorMsg += "-name \n"
    }
    if(number == ""){
        errorMsg += "-number no \n"
    }
    if(food == ""){
        errorMsg += "-food \n"
    }
    if(address == ""){
        errorMsg += "-address \n"
    }

    if(name == "" ||
       number == "" ||
       food == "" ||
       address == "" 
    ){
        alert(errorMsg)
        return
    }

    let link = document.createElement("a")
    link.href = `mailto:syafii2006@gmail.com?subject=Ordering a meal&body=Name: ${name}%0D%0ANumber:${number}%0D%0Aaddress: ${address}%0D%0Ai would like to order a ${food}`
    link.click()
}