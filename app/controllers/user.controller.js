const { user } = require('../models')
const db = require('../models')
const user_model = db.user
const op = db.sequelize.op

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: 'ERROR: Request body cannot be empty'
        })
        return
    }

    const user_query = {
        name: req.body.name,
        password: req.body.password,
        id_number: req.body.id_number,
        address: req.body.address,
        dob: req.body.dob
    }

    user_model.create(user_query)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "ERROR: Cannot create user!"
            })
        })
}

exports.fetch = (req, res) => {
    const name = req.query.name
    var condition = name ? {
        name: {
            [op.iLike]: `%${name}%`
        }
    } : null

    user_model.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'ERROR: Failed to fetch user data'
            })
        })
}

exports.detail = (req, res) => {
    const id = req.params.id

    user_model.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `ERROR: Cannot find user with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'ERROR: Failed to retrieve user with id=' + id
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    user_model.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'SUCCESS: User data updated successfully'
                })
            } else {
                res.send({
                    message: `ERROR: Cannot update user with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'ERROR: Failed to update user data with id=' + id
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    user_model.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'SUCCESS: User data deleted successfully'
                })
            } else {
                res.send({
                    message: `ERROR: Cannot delete user with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'ERROR: Failed to delete user with id=' + id
            })
        })
}

exports.truncate = (req, res) => {
    user_model.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `SUCCESS: ${nums} user data truncated` })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'ERROR: Failed to truncate user'
            })
        })
}