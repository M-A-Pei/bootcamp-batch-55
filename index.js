const exp = require('constants');
const express = require('express')
const order = require("./assets/js/order")
const path = require("path")
const app = express()
const port = 5000

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "assets", "pages"))

app.use(express.static(path.join(__dirname, "assets")))
app.use(express.urlencoded({ extended: false }));

let reviewsList = []

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/employees', function (req, res) {
  res.render('employees')
})

app.get('/reviewsForm', function (req, res) {
  res.render('reviewsForm')
})

app.post('/reviewsForm', function (req, res) {
  const data = req.body;
  reviewsList.unshift(data)
  console.log(reviewsList);
  res.redirect("/reviews")
})

app.get('/reviews', function (req, res) {
  let empty
  if(reviewsList.length == 0){
    empty = true
  }else{
    empty = false
  }
  res.render('reviews', {reviewsList, empty})
})

app.get('/credits', function (req, res) {
  res.render('credits')
})

app.get('/order', function (req, res) {
  res.render('order')
})

app.post('/order', function (req, res){
    const x = req.body
    if(order(x)){
      res.redirect(`mailto:syafii2006@gmail.com?subject=Ordering a meal&body=Name: ${x.name}%0D%0ANumber:${x.number}%0D%0Aaddress: ${x.address}%0D%0Ai would like to order a ${x.order}`)
    }
})

app.listen(port, ()=>{
    console.log(`listening on port http://localhost:${port}/`)
})

