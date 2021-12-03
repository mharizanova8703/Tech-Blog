const seedUser = require('./user-seeds')
const seedPost = require('./post-seeds')
const seedComment = require('./comment-seeds')
const { User, Post, Comment } = require('../models')

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
  await Comment.bulkCreate(seedComment, {
    individualHooks: true,
    returning: true,
  })

  process.exit(0)
}

seedDatabase()
