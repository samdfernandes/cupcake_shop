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

//Show Macarons
router.get('/', (req, res) => {
    Treat.find({type: 'macaron'}, (err, foundMacarons) => {
        if (err) {
            console.log(err);
        } else {
            res.render('macarons.ejs', {
                treats: foundMacarons,
                currentUser: req.session.currentUser
            })
        }
    })
})

//delete Macarons
router.delete('/:id', (req, res) => {
    Treat.findByIdAndRemove(req.params.id, (err, foundMacarons) => {
        res.redirect('/macaron')
    })
})

//edit Macarons
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
            res.redirect(`/macaron`)
        }
    })
})



module.exports = router