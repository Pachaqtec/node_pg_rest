const express = require('express')

const { pool } = require('../connection/connection')

const app = express()

app.get('/listado', async (req, res) => {

  const con = await pool.connect()

  try {
    
    const response = await con.query('select * FROM fn_list_users();')
    console.log('response: ', response.rows)

    res.json({
      status: 200,
      data: response.rows
    })

  } catch (error) {
    console.log('error: ', error);
  }

})

module.exports = app
