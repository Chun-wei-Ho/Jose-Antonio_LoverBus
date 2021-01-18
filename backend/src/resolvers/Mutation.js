const Mutation = {
    addMarker(parent, {marker}, {models, pubsub}, info){
        new models.Marker({
            username: marker.username,
            properties:{
                title: marker.title,
                description: marker.description
            },
            geometry: {
                coordinates: marker.coordinates
            }
        }).save()
    },
    clearAllMarker(parent, args, {models, pubsub}, info){
        models.Marker.deleteMany({}, () => {})
    },
    deleteMarker(parent, {username, title}, {models, pubsub}, info){
        models.Marker.deleteMany({username: username, "properties.title": title}, () => {})
    }
}

module.exports = Mutation