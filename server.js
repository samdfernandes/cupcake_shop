//___________________________________
//
// Dependencies
//___________________________________

const express = require('express')
const app = express()
const mongoose = require('mongoose')

//___________________________________
//
// Port
//___________________________________
const PORT = process.env.PORT || 3000

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


//___________________________________
//
// Listen
//___________________________________
app.listen(PORT, () => console.log('Listening on Port: ', PORT));
