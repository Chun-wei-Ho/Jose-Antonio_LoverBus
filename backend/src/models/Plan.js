const mongoose = require('mongoose')
const Schemas = mongoose.Schema

const PlanSchema= new Schemas({
    username: {
        type: String,
        required: (true, "username is required")
    },
    title: {
        type: String,
        required: (true, "Username is required")
    },
    spotID: {
        type: [Schemas.ObjectId],
        required: (true, "Spot ID is required")
    }
})

const Plan = mongoose.model('plan', PlanSchema)

module.exports = Plan
