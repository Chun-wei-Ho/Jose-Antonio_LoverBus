parsePlan = require("./parsePlan")

const Query = {
    async Marker(parent, args, {models, pubsub}, info){
        const markers = await models.Marker.find({...args})
        return markers
    },
    async UserPlan(parent, {_userId}, {models, pubsub}, info){
        const user = await models.User.findById(_userId)
        const plans = await models.Plan.find({username: user.username})
        console.log(plans)
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
        return users[0]._id
    },
    async Plan(parent, {_id}, {models, pubsub}, info){
        const plans = await models.Plan.findById(_id)
        return await parsePlan.bind({models})(plans)
    },
    async Username(parent, {_id}, {models, pubsub}, info){
        const user = await models.User.findById(_id)
        return user.username
    }
}

module.exports = Query