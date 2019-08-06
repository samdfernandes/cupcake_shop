//___________________________________
//
// Dependencies
//___________________________________

const express = require('express')
const router = express.Router()
const Treat = require('../models/treat')

//___________________________________
//
// Routes
//___________________________________

//Show cakePops
router.get('/', (req, res) => {
    Treat.find({type: 'dessert bar'}, (err, foundCookies) => {
        if (err) {
            console.log(err);
        } else {
            res.render('cookies.ejs', {
                treats: foundCookies
            })
        }
    })
})

//delete cakePops
router.delete('/:id', (req, res) => {
    Treat.findByIdAndRemove(req.params.id, (err, foundCookies) => {
        res.redirect('/cookies')
    })
})

//edit cakePops
router.get('/:id/edit', (req, res) => {
    Treat.findById(req.params.id, (err, foundTreat) => {
        if (err) {
            console.log(err);
        } else  {
            res.render('edit.ejs', {
                treat: foundTreat
            })
        }
    })
})

router.put('/:id', (req, res) => {
    Treat.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTreat) => {
        if (err) {
            console.log(err);
        } else {
            console.log(updatedTreat);
            res.redirect(`/cookies`)
        }
    })
})



module.exports = router