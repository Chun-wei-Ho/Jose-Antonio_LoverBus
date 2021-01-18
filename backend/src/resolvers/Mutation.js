const Mutation = {
    addMarker(parent, {marker}, {models, pubsub}, info){
        const _marker = {
            username: marker.username,
            properties:{
                title: marker.title,
                description: marker.description
            },
            geometry: {
                coordinates: marker.coordinates
            }
        }
        new models.Marker(_marker).save()
        pubsub.publish(_marker.username, {subscribeUser: {
            mutation: 'NEW', data: _marker
        }})
    },
    clearAllMarker(parent, args, {models, pubsub}, info){
        //shouldn't be called, only for debugging
        models.Marker.deleteMany({}, () => {})
    },
    deleteMarker(parent, {username, title}, {models, pubsub}, info){
        models.Marker.deleteMany({username: username, "properties.title": title}, () => {})
        pubsub.publish(username, {subscribeUser: {
            mutation: 'DELETE', data: {properties: {title: title}}
        }})

    }
}

module.exports = Mutation