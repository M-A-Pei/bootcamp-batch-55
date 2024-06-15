const exp = require('constants');
const express = require('express')
const order = require("./assets/js/order")
const path = require("path");
const {Sequelize, QueryTypes} = require("sequelize")
const config = require("./config/config.json")
const sequelize = new Sequelize(config.development)
const checkReview = require("./assets/js/reviewes")
const app = express()
const port = 5000

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "assets", "pages"))

app.use("/assets" ,express.static(path.join(__dirname, "assets")))
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
  if(checkReview(data)){
    reviewsList.unshift(data)
    console.log(reviewsList);
    res.redirect("/reviews")
  }
  
  res.redirect('/reviewsForm')
})

app.post('/reviewDelete/:id', function(req, res){
  const {id} = req.params
  sequelize.query(`DELETE FROM public."Reviews" WHERE id=${id}`)
  res.redirect('/reviews')
})

app.get("/reviewEdit/:id", function(req, res){
  const {id} = req.params
  const data = reviewsList[id]
  res.render('reviewEdit', {id, data ,title: "edit review"})
})

app.post("/reviewEdit/:id", function(req, res){
  const {id} = req.params
  const {name, stayed, left, review, burger, pizza, kelp, hotdog, img} = req.body
  reviewsList[id] = {
    name, stayed, left, review, burger, pizza, kelp, hotdog, img
  }
  res.redirect('/reviews')
})

app.get('/reviews', async function (req, res) {

  const data = await sequelize.query(`SELECT * FROM public."Reviews"`, {typeof: QueryTypes.SELECT})
  let empty
  if(data.length == 0){
    empty = true
  }else{
    empty = false
  }
  console.log(empty)
  res.render('reviews', {data: data[0], empty})
})

app.get('/abc', async function (req, res) {

  const data = await sequelize.query(`SELECT * FROM public."Reviews"`, {typeof: QueryTypes.SELECT})
  let empty
  if(data.length == 0){
    empty = true
  }else{
    empty = false
  }

  res.json(data[0])
})

app.get('/reviewInfo/:id', function(req, res){
  const id = req.params.id
  res.render('reviewInfo', {id: reviewsList[id]})
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
    console.log(path.join(__dirname, "assets", "/"))
})

