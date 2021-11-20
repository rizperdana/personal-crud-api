module.exports = app => {
    const user = require('../controllers/user.controller')

    var router = require('express').Router()

    // create user
    router.post('/', user.create)

    // fetch user list
    router.get('/', user.fetch)

    // user detail
    router.get('/:id', user.detail)

    // update user
    router.put('/:id', user.update)

    // delete certain user data
    router.delete('/:id', user.delete)

    // truncate user data
    router.delete('/', user.truncate)

    app.use('/api/user', router)
}