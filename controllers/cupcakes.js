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

//create new cupcake
router.get('/create', (req, res) => {
    res.render('create.ejs')
})

router.post('/', (req, res) => {
    Treat.create(req.body, () => {
        res.redirect('/')
    })
})

//Show cupcakes
router.get('/', (req, res) => {
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
            res.redirect(`/cupcakes`)
        }
    })
})



module.exports = router