parsePlan = require("./parsePlan")

const Query = {
    async Marker(parent, args, {models, pubsub}, info){
        const markers = await models.Marker.find({...args})
        return markers
    },
    async UserPlan(parent, args, {models, pubsub}, info){
        const plans = await models.Plan.find({...args})
        return await Promise.all(plans.map(parsePlan, {models}))
    },
    async signIn(parent, args, {models, pubsub}, info){
        const users = await models.User.find({...args})
        return (users.length === 1)
    },
    async Plan(parent, {_id}, {models, pubsub}, info){
        const plans = await models.Plan.findById(_id)
        const parsedPlan = await parsePlan.bind({models})(plans)
        console.log(parsedPlan)
        return parsedPlan
    }
}

module.exports = Query