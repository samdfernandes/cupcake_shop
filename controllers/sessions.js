const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })
})

router.post('/', (req, res) => {
    User.findOne ({ username: req.body.username }, (err, foundUser) => {
        if(bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser;
            res.redirect('/')
        } else {
            res.send('wrong password')
        }
    })
})


router.delete('/', (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
})

module.exports = router