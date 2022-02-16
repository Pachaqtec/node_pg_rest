const express = require('express')

const { User } = require('../controllers/usuario')

const app = express()

app.get('/listado', async (req, res) => {

  try {

    const response = await User.getListUser()
    
    // console.log('response: ', response.rows)

    res.json({
      status: 200,
      data: response.rows
    })

  } catch (error) {
    console.log('error: ', error);
  }

})

app.post('/crear', async (req, res) => {
  
  try {
    const response = await User.createUser(req)
    
    if (response.status === 200) {
      return res.json(response)
    }

    return res.status(504).json(response)

  } catch (error) {
    console.log('error: ', error)
  }

})

app.delete('/eliminar/:id', async (req, res) => {
  try {
    const response = await User.deleteUser(req)

    return res.json(response)

  } catch (error) {
    console.log('error: ', error);
  }
})

app.put('/actualizar/:id', async (req, res) => {
  try {
    const response = await User.updateUser(req, res)

    return res.json(response)
  } catch (error) {
    console.log('error: ', error);
  }
})

module.exports = app
