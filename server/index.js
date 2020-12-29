const { GraphQLServer, PubSub } = require('graphql-yoga')
const resolvers = require('./resolvers/index.js')

require('dotenv-defaults').config()

// init middleware
const pubsub = new PubSub()
const server = new GraphQLServer({
    typeDefs: './server/schema.graphql',
    resolvers: resolvers,
    context: {
        pubsub
    }
})

const PORT = process.env.PORT || 4000

server.start({ port: PORT }, () => {
    console.log(`The server is up on port ${PORT}!`)
})

