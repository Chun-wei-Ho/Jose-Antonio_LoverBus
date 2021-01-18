const mongoose = require('mongoose')
const models = require('./models')

require('dotenv').config()

const dboptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  auto_reconnect: true,
  useUnifiedTopology: true,
  poolSize: 10
}

mongoose.connect(process.env.MONGO_URL, dboptions)

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')
})

module.exports = models
