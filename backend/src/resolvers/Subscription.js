const Subscription = {
    async subscribeUser(parent, {username}, {models, pubsub}, info){
        console.log("fsafjfjksdjfsh")
        return pubsub.asyncIterator(username)
    }
}

module.exports = Subscription
