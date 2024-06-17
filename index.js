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

app.get('/', function (req, res) {
  res.render('index', {title:"Profile page"})
})

app.get('/employees', function (req, res) {
  res.render('employees', {title:"Employees page"})
})

app.get('/reviewsForm', function (req, res) {
  res.render('reviewsForm', {title:"make a review"})
})

app.post('/reviewsForm', async function (req, res) {
  const data = req.body;
  if(checkReview(data)){
    if(data.burger == undefined) {data.burger = false} else data.burger = true
    if(data.pizza == undefined) {data.pizza = false} else data.pizza = true
    if(data.kelp == undefined) {data.kelp = false} else data.kelp = true
    if(data.hotdog == undefined) {data.hotdog = false} else data.hotdog = true
    let query = `INSERT INTO public."Reviews"(name, stayed, "left", review, burger, pizza, kelp, hotdog, "createdAt", "updatedAt")VALUES('${data.name}', '${data.stayed}', '${data.left}', '${data.review}', '${data.burger}', '${data.pizza}', '${data.kelp}', '${data.hotdog}', '15/6/2024', '15/6/2024');`
    await sequelize.query(query, {typeof: QueryTypes.INSERT})
    res.redirect("/reviews")
  }else{
    res.redirect('/reviewsForm')
  }
})

app.post('/reviewDelete/:id', function(req, res){
  const {id} = req.params
  sequelize.query(`DELETE FROM public."Reviews" WHERE id=${id}`)
  res.redirect('/reviews')
})

app.get("/reviewEdit/:id", async function(req, res){
  const {id} = req.params
  const data = await sequelize.query(`SELECT * FROM public."Reviews" where id=${id};`)
  res.render('reviewEdit', {id, data: data[0][0] ,title: "Edit review"})
})

app.post("/reviewEdit/:id", async function(req, res){
  const {id} = req.params
  let {name, stayed, left, review, burger, pizza, kelp, hotdog, img} = req.body

  if(burger == undefined) {burger = false} else burger = true
  if(pizza == undefined) {pizza = false} else pizza = true
  if(kelp == undefined) {kelp = false} else kelp = true
  if(hotdog == undefined) {hotdog = false} else hotdog = true

  await sequelize.query(`UPDATE public."Reviews"
	SET name='${name}', stayed='${stayed}', "left"='${left}', review='${review}', burger='${burger}', pizza='${pizza}', kelp='${kelp}', hotdog='${hotdog}'
	WHERE id=${id};`)
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
  res.render('reviews', {data: data[0], empty, title: "Reviews page"})
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

app.get('/reviewInfo/:id', async function(req, res){
  const id = req.params.id
  const data = await sequelize.query(`SELECT * FROM public."Reviews" where id=${id};`)
  res.render('reviewInfo', {id: data[0][0], title: `this is about ${data[0][0].name}`})
})

app.get('/credits', function (req, res) {
  res.render('credits', {title: "Credits page"})
})

app.get('/order', function (req, res) {
  res.render('order', {title: "Order page"})
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

