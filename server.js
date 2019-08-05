//___________________________________
//
// Dependencies
//___________________________________

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Treat = require('./models/treat')
const treatsController = require('./controllers/treats')
const seed = require('./models/seed')

//___________________________________
//
// Port
//___________________________________
const PORT = process.env.PORT || 3000

//___________________________________
//
// Middleware
//___________________________________
app.use(express.urlencoded({ extended: false }));
// app.use(session({
//   secret: 'mySecretString',
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(methodOverride('_method'))
app.use(express.json());
// static files middleware
app.use(express.static('public'))
app.use(treatsController)


//___________________________________
//
// Database
//___________________________________
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/cupcakesAndOtherSweets'


//mongo connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
    console.log('CONNECTED TO MONGO')
})

//___________________________________
//
// Routes
//___________________________________
//localhost: 3000
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/cupcakes', (req, res) => {
    res.render('cupcakes.ejs')
})

app.get('/seedTreats', (req, res) => {
    Treat.create(seed, (err, createdTreats) => {
        if (err) {
            console.log(err);
        } else {
        console.log(createdTreats);
        res.redirect('/')
        }
    })
})


//___________________________________
//
// Listen
//___________________________________
app.listen(PORT, () => console.log('Listening on Port: ', PORT));
