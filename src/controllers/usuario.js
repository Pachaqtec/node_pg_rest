const { pool } = require('../connection/connection')

class User {

  static getListUser = async () => {
    const con = await pool.connect()
  
    try {
      const response = await con.query('select * FROM fn_list_users();')
      
      return response
    } catch (error) {
      throw new Error(error)
    }
  
  }

  static createUser = async (req) => {
    const { name, lastname, age, email, idRol } = req.body
    const con = await pool.connect()
  
    try {
      const response = await con.query('SELECT fn_add_user($1, $2, $3, $4, $5);', [name, lastname, age, email, idRol])
      console.log('response: ', response);
      
      if (Number(response.rows[0].fn_add_user) && Number(response.rows[0].fn_add_user) > 0) {
        return {
          status: 200,
          response: 'Usuario creado con el código ' + response.rows[0].fn_add_user
        }
      }

      return {
        status: 504,
        response: 'Error al crear el usuario'
      }

    } catch (error) {
      throw new Error(error)
    }
  
  }
}

module.exports = {
  User
}