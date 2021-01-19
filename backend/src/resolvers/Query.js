const Query = {
    async Marker(parent, args, {models, pubsub}, info){
        const markers = await models.Marker.find({...args})
        return markers
    },
    async Plan(parent, args, {models, pubsub}, info){
        const plans = await models.Plan.find({...args})
        return await Promise.all(plans.map(async e => {
            const spots = await models.Spot.find().where('_id').in(e.spotID).exec()
            const result = await Promise.all(spots.map(async e =>{
                const marker = await models.Marker.findById(e.markerID)
                return {
                    startTime: e.startTime.toString(),
                    endTime: e.endTime.toString(),
                    location: marker
                }
            }))
            return {title: e.title, _id: e._id, spots:result}
        }))
    },
    async signIn(parent, args, {models, pubsub}, info){
        const users = await models.User.find({...args})
        return (users.length === 1)
    }
}

module.exports = Query