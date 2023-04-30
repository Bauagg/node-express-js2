const express = require('express')
const app = express()
const routerUsers = require('./APP/users/routes')
const logger = require('morgan')

app.use(logger('dev'))
app.use(express.json())
app.use('/', routerUsers)
app.use(require('./middelware/middelware'))

app.listen(3000, () => console.log('localhost udah berjalan di port 3000 start'))