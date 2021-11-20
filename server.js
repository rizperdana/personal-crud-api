const express = require('express')
const body_parser = require('body-parser')
const cors = require('cors')

const app = express()

const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))


const db = require('./app/models')
db.sequelize_db.sync({ force: true }).then(() => {
        console.log('Drop and re-sync db')
    }) //force db to drop sinc it in development mode

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to personal-crud API' })
})

require('./app/routes/user.routes')(app)

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})