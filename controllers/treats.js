const express = require('express')
const router = express.Router()
const Treat = require('../models/treat')

router.get('/create', (req, res) => {
    res.render('create.ejs')
})

router.post('/', (req, res) => {
    Treat.create(req.body, () => {
        res.redirect('/')
    })
})

router.get('/cupcakes', (req, res) => {
    Treat.find({type: 'cupcake'}, (err, foundCupcakes) => {
        if (err) {
            console.log(err);
        } else {
            res.render('cupcakes.ejs', {
                treats: foundCupcakes
            })
        }
    })
})

module.exports = router