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

  static deleteUser = async (req) => {
    const con = await pool.connect()

    try {

      const { params: { id } } = req

      const response = await con.query(`
      DELETE FROM TB_USUARIOS
      WHERE id_user = $1;
      `, [id])
      console.log('response' , response)

      return {
        status: 200,
        message: `El usuario con el ${req.params.id} fue eliminado !`
      }   
    } catch (error) {   
      console.log('error: ', error)
    }

  }

  static updateUser = async (req, res) => {
    const con = await pool.connect()
    try {

      const { params: { id }, body } = req
      const { names, lastname, age, email, idRol } = body

      await con.query(`
        UPDATE TB_USUARIOS
        SET NAMES = $1,
            LASTNAME = $2,
            AGE = $3,
            EMAIL = $4,
            ID_ROL = $5
        WHERE id_user = $6
      `, [names, lastname, age, email, idRol, id])

      return {
        status: 200,
        message: `Se creó un nuevo usuario!`
      } 

    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json(error)
    }
  }
}

module.exports = {
  User
}