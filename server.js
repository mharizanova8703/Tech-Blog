const express = require('express')
const sequelize = require('./config/connection')
const path = require('path')
const routes = require('./controllers')
const exphbs = require('express-handlebars')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const helpers = require('./utils/helpers')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUnitilaized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
}

app.use(session(sess))

const hbs = exphbs.create()
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//app.use(require('./controllers'))
app.use(routes)
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Now Listening on ${PORT}`))
})
