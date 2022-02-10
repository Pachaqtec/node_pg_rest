const { Pool } = require('pg')

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env

const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
})

module.exports = {
  pool
}
