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
    Treat.find({type: 'cake pop'}, (err, foundCakePops) => {
        if (err) {
            console.log(err);
        } else {
            res.render('cakePop.ejs', {
                treats: foundCakePops
            })
        }
    })
})

//delete cakePops
router.delete('/:id', (req, res) => {
    Treat.findByIdAndRemove(req.params.id, (err, foundCakePops) => {
        res.redirect('/cakePop')
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
            res.redirect(`/cakePop`)
        }
    })
})



module.exports = router