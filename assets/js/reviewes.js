const notifier = require('node-notifier');

module.exports = function handleReview(e){

    let name = e.name
    let stayed = e.stayed
    let left = e.left
    let review = e.review
    let image = e.image

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
    if(image){
      errorMsg += "\n -picture"
    }

    errorMsg += "\n please fill them in"
    
    if(name == "" || stayed == ""|| left == ""|| review == ""|| image == ""){
      notifier.notify({
        title: 'form not complete',
        message: errorMsg,
        sound: true,
    })
      return false
      
    }

    return true
}