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

//Show cupcakes
router.get('/', (req, res) => {
    Treat.find({type: 'cupcake'}, (err, foundCupcakes) => {
        if (err) {
            console.log(err);
        } else {
            res.render('cupcakes.ejs', {
                treats: foundCupcakes,
                currentUser: req.session.currentUser
            })
        }
    })
})

//delete cupcakes
router.delete('/:id', (req, res) => {
    Treat.findByIdAndRemove(req.params.id, (err, foundCupcake) => {
        res.redirect('/cupcakes')
    })
})

//edit cupcakes
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
            res.redirect(`/cupcake`)
        }
    })
})



module.exports = router