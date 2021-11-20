module.exports = (sequelize_db, sequelize) => {
    const user_model = sequelize_db.define('user', {
        name: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        id_number: { type: sequelize.STRING },
        address: { type: sequelize.STRING },
        dob: { type: sequelize.STRING },
    })

    return user_model
}