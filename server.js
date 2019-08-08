//___________________________________
//
// Dependencies
//___________________________________

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Treat = require('./models/treat')
const cupcakesController = require('./controllers/cupcakes')
const cakePopController = require('./controllers/cakePop')
const cookieController = require('./controllers/cookies')
const macaronController = require('./controllers/macarons')
const sessionsController = require('./controllers/sessions')
const usersController = require('./controllers/users')
const seed = require('./models/seed')
const methodOverride = require('method-override')

const session = require('express-session')
const bcrypt = require('bcrypt')


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
app.use(session({
  secret: 'mySecretString',
  resave: false,
  saveUninitialized: false
}))
app.use(methodOverride('_method'))
app.use(express.json());
// static files middleware
app.use(express.static('public'))

// files controllers
app.use('/cupcake', cupcakesController)
app.use('/cakepop', cakePopController)
app.use('/cookie', cookieController)
app.use('/macaron', macaronController)
app.use('/sessions', sessionsController)
app.use('/users', usersController)



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

//home page
app.get('/', (req, res) => {

    res.render('index.ejs', {
        currentUser: req.session.currentUser
    })
})

//create new treat
app.get('/create', (req, res) => {
    res.render('create.ejs', {
        currentUser: req.session.currentUser
    })
})

app.post('/', (req, res) => {
    Treat.create(req.body, () => {
        res.redirect('/')
    })
})
 
//seed route
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

app.get('/app', (req, res) => {
    Treat.find({}, (err, foundItems) => {
        if (err) {
            console.log(err);
        } else {
            res.render('app.ejs', {
                currentUser: req.session.currentUser,
                treats: foundItems
            })
        }
    })
})

app.get('/drop', (req, res) => {
    Treat.remove({}, (err, data) => {
        if (err) {
            console.log(data);
        } else {
            console.log(data);
            
        }
    });
    res.redirect('/')
})

app.get('/cakes', (req, res) => {
    res.render('cakes.ejs', {
        currentUser: req.session.currentUser
    })
})

app.get('/contact', (req, res) => {
    res.render('contact.ejs', {
        currentUser: req.session.currentUser
    })
})

//___________________________________
//
// Listen
//___________________________________
app.listen(PORT, () => console.log('Listening on Port: ', PORT));
