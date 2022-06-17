const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const signUpRouter = require('./routes/api/auth/signup')
const loginRouter = require('./routes/api/auth/login')
const currentUser = require('./routes/api/currentUser')
const logoutRouter = require('./routes/api/auth/logout')
const updateSubscriptionRouter = require('./routes/api/auth/updateSubscription')



const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', signUpRouter)
app.use('/api/users', loginRouter)
app.use('/api/users', logoutRouter)
app.use('/api/users', currentUser)
app.use('/api/users', updateSubscriptionRouter)





app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({ message: err.message })
})

module.exports = app
