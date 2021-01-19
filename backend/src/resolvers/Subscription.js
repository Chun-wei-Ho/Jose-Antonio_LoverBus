const Subscription = {
    subscribeMarker: {
        subscribe(parent, {username}, {models, pubsub}, info){
            const topics = [`marker.${username}`]
            return pubsub.asyncIterator(topics)
        }
    }
}

module.exports = Subscription
