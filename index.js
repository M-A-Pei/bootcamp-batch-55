const exp = require('constants');
const express = require('express')
const path = require("path");
const {Sequelize, QueryTypes} = require("sequelize")
const session = require("express-session")
const bcrypt = require("bcrypt")
const flash = require("express-flash")
const hbs = require("hbs")
const multer = require("multer")
const upload = multer({dest: 'assets/uploads/'})

const order = require("./assets/js/order")
const checkReview = require("./assets/js/reviewes")
const config = require("./config/config.json")

const sequelize = new Sequelize(config.development)
const app = express()
const port = 5000

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "src", "pages"))

app.use("/assets" ,express.static(path.join(__dirname, "assets")))
app.use(express.urlencoded({ extended: false }));
app.use(session({
  name: "data",
  secret: "krabypattysecretformula",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
  },
})
)
app.use(flash())

hbs.registerPartials("./src/pages/props")

app.get('/', function (req, res) {
  const isLogin = req.session.isLogin
  const user = req.session.user
  res.render('index', {title:"Profile page", isLogin, user})
})

app.get('/employees', function (req, res) {
  const isLogin = req.session.isLogin
  res.render('employees', {title:"Employees page", isLogin})
})

app.get('/reviewsForm', function (req, res) {
  const isLogin = req.session.isLogin
  if(!isLogin){
    req.flash("notLoggedIn", "you need to be logged in to write a review")
    return res.redirect('/login')
  }
  res.render('reviewsForm', {title:"make a review", isLogin})
})

app.post('/reviewsForm', upload.single('img') ,async function (req, res) {
  const data = req.body;
  const img = req.file.filename
  const author = req.session.user.name

  if(checkReview(data)){
    if(data.burger == undefined) {data.burger = false} else data.burger = true
    if(data.pizza == undefined) {data.pizza = false} else data.pizza = true
    if(data.kelp == undefined) {data.kelp = false} else data.kelp = true
    if(data.hotdog == undefined) {data.hotdog = false} else data.hotdog = true
    let query = `INSERT INTO public."Reviews"(review, stayed, "left", description, burger, pizza, kelp, hotdog, "createdAt", "updatedAt", image, author)VALUES('${data.review}', '${data.stayed}', '${data.left}', '${data.description}', '${data.burger}', '${data.pizza}', '${data.kelp}', '${data.hotdog}', '15/6/2024', '15/6/2024', '${img}', '${author}');`
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
  const isLogin = req.session.isLogin
  res.render('reviewEdit', {id, data: data[0][0] ,title: "Edit review", isLogin})
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

  const isLogin = req.session.isLogin
  res.render('reviews', {data: data[0], empty, title: "Reviews page", isLogin})
})

app.get('/reviewInfo/:id', async function(req, res){
  const id = req.params.id
  const data = await sequelize.query(`SELECT * FROM public."Reviews" where id=${id};`)
  const isLogin = req.session.isLogin

  res.render('reviewInfo', {id: data[0][0], title: `this is about ${data[0][0].name}`, isLogin})
})

app.get('/order', (req, res) => {
  const isLogin = req.session.isLogin
  res.render('order', {title: "Order page", isLogin})
})

app.post('/order', (req, res) => {
    const x = req.body
    if(order(x)){
      res.redirect(`mailto:syafii2006@gmail.com?subject=Ordering a meal&body=Name: ${x.name}%0D%0ANumber:${x.number}%0D%0Aaddress: ${x.address}%0D%0Ai would like to order a ${x.order}`)
    }
})

app.get('/login', (req, res) => {
    const isLogin = req.session.isLogin
    res.render('login', {title: "Login to your account", isLogin})
})

app.post('/login', async(req, res) => {
    const {email, password} = req.body

    const data = await sequelize.query(`SELECT * FROM public."Users" WHERE email='${email}'`, {type: QueryTypes.SELECT})

    console.log(data.length)
    if(data.length == 0){
      req.flash("loginFailed", "Login Failed, Email is not registered")
      return res.redirect('/login')
    }

    bcrypt.compare(password, data[0].password, (err, result)=>{
        if(err){
          req.flash("loginFailed", "Login Failed, server failed")
          return res.redirect('/login')
        }

        if(!result){
          req.flash("loginFailed", "Login Failed, password was wrong")
          return res.redirect('/login')
        }

        req.flash("loginSuccess", "Login Success!")
        req.session.isLogin = true
        req.session.user = {
          name: data[0].name,
          email: data[0].email,
          description: data[0].description,
          profilePic: data[0].profilepic
        }

        console.log(req.session.user)
        res.redirect("/")
    })


})

app.get('/register', (req, res) => {
  const isLogin = req.session.isLogin
  res.render('register', {title: "Register an account", isLogin})
})

app.post('/register', upload.single("profilePic") ,async(req, res) => {
  const {name, email, password, description} = req.body;
  const img = req.file.filename
  
  const check = await sequelize.query(`SELECT * FROM public."Users" WHERE email='${email}'`)
  if(check[0].length != 0){
    req.flash("registerFailed", "Register Failed, Email is already being used!")
    return res.redirect('/register')
  }
  bcrypt.hash(password, 10, async (err, hash)=>{
    if(err){
      req.flash("registerFailed", "Register Failed, Password cant be encrypted!")
      return res.redirect('/register')
    }
    await sequelize.query(`INSERT INTO public."Users"(name, email, password, profilePic, description) VALUES('${name}','${email}','${hash}', '${img}', '${description}')`)
    
  })
  req.flash("registerSuccess", "Account Successfully made, now go login")
  res.redirect('/login')
})

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'))
})

app.listen(port, ()=>{
    console.log(`listening on port http://localhost:${port}/`)
})

