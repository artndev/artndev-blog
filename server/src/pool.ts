import mysql from 'mysql2/promise'

export default mysql.createPool({
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DBNAME,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true,
})
