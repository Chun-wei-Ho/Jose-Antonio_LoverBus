const { GraphQLServer, PubSub } = require('graphql-yoga')
const resolvers = require('./resolvers')
const models = require('./db.js')

require('dotenv-defaults').config()

// init middleware
const pubsub = new PubSub()
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: resolvers,
    context: {
        models,
        pubsub
    }
})

const PORT = process.env.PORT || 4000

server.start({ port: PORT }, () => {
    console.log(`The server is up on port ${PORT}!`)
})

