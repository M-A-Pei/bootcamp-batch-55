const notifier = require('node-notifier');

module.exports = function handleOrder(e){
    const name = e.name
    const number = e.number
    const food = e.order
    const address = e.address

    let errorMsg = "the following data is empty:\n"
    if(name == ""){
        errorMsg += "-name \n"
    }
    if(number == ""){
        errorMsg += "-number \n"
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
        notifier.notify({
            title: 'form not complete',
            message: errorMsg,
            sound: true,
        })
        return false
    }

    return true

} 