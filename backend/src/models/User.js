const mongoose = require('mongoose')
const Schemas = mongoose.Schema

const MarkerSchema= new Schemas({
    username: {
        type: String,
        required: (true, "Username is required")
    },
    password: {
        type: String,
        required: (true, "Password is required")
    }
})

const Marker = mongoose.model('user', MarkerSchema)

module.exports = Marker
