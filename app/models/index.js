const db_config = require('../config/db.config.js')

const sequelize = require('sequelize')
const sequelize_db = new sequelize({
    dialect: db_config.dialect,
    storage: db_config.storage,
})

const db = {}

db.sequelize = sequelize
db.sequelize_db = sequelize_db

db.user = require('./user.model.js')(sequelize_db, sequelize)

module.exports = db