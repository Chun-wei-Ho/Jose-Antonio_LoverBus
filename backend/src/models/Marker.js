const mongoose = require('mongoose')
const Schemas = mongoose.Schema

const MarkerSchema= new Schemas({
    username: {
        type: String,
        required: (true, "Username is required")
    },
    type: {type: String, default: "Feature"},
    properties: {
        title: {
            type: String,
            required: (true, "Title is required")
        },
        description: {
            type: String,
            default: "No description"
        }
    },
    geometry: {
        coordinates: {
            type: [Number],
            required: (true, "Coordinates is required"),
            validate: [e => e.length == 2, 'Coordinates must be 2 dimensional']
        },
        type: {type: String, default: "Point"}
    }
})

const Marker = mongoose.model('marker', MarkerSchema)

module.exports = Marker
