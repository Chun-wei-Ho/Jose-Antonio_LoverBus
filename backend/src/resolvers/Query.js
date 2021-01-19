const Query = {
    async Marker(parent, args, {models, pubsub}, info){
        const markers = await models.Marker.find({...args})
        return markers
    },
    async Plan(parent, args, {models, pubsub}, info){
        const plans = await models.Plan.find({...args})
        return plans.map(e => {
            return {title: e.title, _id: e._id, spots:[]}})
    },
    async signIn(parent, args, {models, pubsub}, info){
        const users = await models.User.find({...args})
        return (users.length === 1)
    }
}

module.exports = Query