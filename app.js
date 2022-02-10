const express = require('express')
require('dotenv').config()

const app = express()

app.use('/users', require('./src/routes/usuario'))

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})