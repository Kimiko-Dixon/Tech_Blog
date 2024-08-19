const router = require('express').Router()
const ifLoggedIn = require('../../utils/middleware')

const dashboardRoute = require('./posts')
const user = require('./user')

router.use('/posts',ifLoggedIn,dashboardRoute)
router.use('/user', user)

module.exports = router