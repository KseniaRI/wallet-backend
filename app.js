const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const transactionsRouter = require('./routes/api/transactionsRoutes');
const authRouter = require('./routes/api/authRoutes');
const usersRouter = require('./routes/api/usersRoutes');
require("dotenv").config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json());
app.use(express.static("public"));

app.use('/api/auth', authRouter )
app.use('/api/transactions', transactionsRouter);
app.use('/api/users', usersRouter)

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' })
  
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })

})

module.exports = app;
