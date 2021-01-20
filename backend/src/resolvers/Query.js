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
        if(users.length === 0){
            const findUser = await models.User.find({username: args.username})
            const userexist = (findUser.length === 1)
            if(userexist) {throw "wrong password"}
            else {throw `user ${args.username} doesn't exist`}
        }
        return (users.length === 1)
    },
    async Plan(parent, {_id}, {models, pubsub}, info){
        const plans = await models.Plan.findById(_id)
        return await parsePlan.bind({models})(plans)
    }
}

module.exports = Query