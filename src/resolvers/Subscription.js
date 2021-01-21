const Subscription = {
    subscribeMarker: {
        subscribe(parent, {username}, {models, pubsub}, info){
            const topics = [`marker.${username}`]
            return pubsub.asyncIterator(topics)
        }
    },
    subscribePlan:{
        subscribe(parent, {username}, {models, pubsub}, info){
            const topics = [`plan.${username}`]
            return pubsub.asyncIterator(topics)
        }
    }
}

module.exports = Subscription
