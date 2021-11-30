const seedUser = require('./user-seeds.js')
const seedPost = require('./post-seeds.js')
const { User, Post } = require('../models')

const sequelize = require('../config/connection')
const seedDatabase = async () => {
  await sequelize.sync({ force: true })
  await User.bulkCreate(seedUser, {
    individualHooks: true,
    returning: true,
  })
  await Post.bulkCreate(seedPost, {
    individualHooks: true,
    returning: true,
  })

  process.exit(0)
}

seedDatabase()
