const router = require('express').Router()

const apiRoute = require('./api')
const pagesRoute = require('./navigation')

router.use('/', pagesRoute)
router.use('/api', apiRoute)

module.exports = router