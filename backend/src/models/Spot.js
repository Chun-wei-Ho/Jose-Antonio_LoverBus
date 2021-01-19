const mongoose = require('mongoose')
const Schemas = mongoose.Schema

const SpotSchema= new Schemas({
    planID: {
        type: String,
        required: (true, "username is required")
    },
    markerID: {
        type: String,
        required: (true, "markerID is required")
    },
    startTime:{
        type: Date,
        required: (true, "startTime is required")
    },
    endTime: {
        type: Date,
        required: (true, "endTime is required")
    }
})

const Spot = mongoose.model('spot', SpotSchema)

module.exports = Spot
