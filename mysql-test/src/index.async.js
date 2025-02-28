// import mysql from 'mysql2/promise';
const mysql = require('mysql2/promise');

// Create the connection to database

(async function () {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'lee123',
    database: 'hello_mysql'
  });

  try {
    const [results, fields] = await connection.query('select * from use_info')
    console.log(results, fields)
  } catch (err) {
    console.log(err)
  }

  try {
    const [results, fields] = await connection.query(
      'select * from use_info where id like ?',
      ['1']
    )
    console.log(results, fields)
  } catch (err) {
    console.log(err)
  }

  try {
    const [results, fields] = await connection.execute(``)
  } catch (error) {
    
  }
})()