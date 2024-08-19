const express = require('express')
const path = require('path')
const session = require('express-session')
const Store = require('connect-session-sequelize')(session.Store)
const handlebars = require('express-handlebars')

const sequelize = require('./config/connection')
const routes = require('./controllers')
//helpers if needed

const app = express()
const PORT = process.env.PORT || 3001

const sess = {
    secret: process.env.SECRET,
    cookie:{},
    resave: false,
    saveUninitialized: true,
    store: new Store({
        db: sequelize
    })
}

app.use(session(sess))

const hbs = handlebars.create({})
app.engine('handelbars', hbs.engine)
app.set('view engine','handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(routes)

sequelize.sync({force:true}).then(() => {
    app.listen(PORT,() => console.log(`http://localhost:${PORT}`))
})
