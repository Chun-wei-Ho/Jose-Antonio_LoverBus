const Subscription = {
    subscribeUser: {
        subscribe(parent, {username}, {models, pubsub}, info){
            const topics = [username]
            return pubsub.asyncIterator(topics)
        }
    }
}

module.exports = Subscription
