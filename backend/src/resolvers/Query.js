const Query = {
    async Marker(parent, args, {models, pubsub}, info){
        const markers = await models.UserMarker.find()
        return markers.filter(e => e.username == args.username)
    }
}

module.exports = Query