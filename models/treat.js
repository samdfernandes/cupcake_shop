const mongoose = require('mongoose');
const Schema = mongoose.Schema

const treatSchema = Schema({
    name: String,
    description: String,
    image: String,
    type: String,
    unitPrice: {type: Number, default: 3.50}
})

const Treat = mongoose.model('Treat', treatSchema)

module.exports = Treat
