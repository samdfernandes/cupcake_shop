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
    Treat.find({type: 'cookie'}, (err, foundCookies) => {
        if (err) {
            console.log(err);
        } else {
            res.render('cookies.ejs', {
                treats: foundCookies,
                currentUser: req.session.currentUser
            })
        }
    })
})

//delete cakePops
router.delete('/:id', (req, res) => {
    Treat.findByIdAndRemove(req.params.id, (err, foundCookies) => {
        res.redirect('/cookie')
    })
})

//edit cakePops
router.get('/:id/edit', (req, res) => {
    Treat.findById(req.params.id, (err, foundTreat) => {
        if (err) {
            console.log(err);
        } else  {
            res.render('edit.ejs', {
                treat: foundTreat,
                currentUser: req.session.currentUser
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
            res.redirect(`/cookie`)
        }
    })
})



module.exports = router