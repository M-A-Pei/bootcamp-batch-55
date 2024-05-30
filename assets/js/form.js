function handleSubmit(){
    const name = document.getElementById("name").value
    const phone = document.getElementById("phone").value
    const message = document.getElementById("message").value
    const subject = document.getElementById("subject").value

    let errorMsg = "the following data is empty:\n"
    if(name == ""){
        errorMsg += "-name \n"
    }
    if(phone == ""){
        errorMsg += "-phone no \n"
    }
    if(message == ""){
        errorMsg += "-message \n"
    }
    if(subject == ""){
        errorMsg += "-subject \n"
    }

    if(name == "" ||
       phone == "" ||
       message == "" ||
       subject == "" 
    ){
        alert(errorMsg)
        return
    }

    console.log(
        `Name : ${name}\nPhone : ${phone}\nSubject : ${subject}\nMessage : ${message}`
      );

    

    let link = document.createElement('a')
    link.href = `mailto:syafii2006@gmail.com?subject=${subject}&body=hey my name is ${name} %0D%0Amy phone number is ${phone} %0D%0A${message}`
    link.click()
}